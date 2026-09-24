import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Converte qualquer formato de cor CSS moderno (oklch, oklab, color(display-p3...))
 * para RGB / RGBA / Hex padrão sRGB suportado nativamente pelo html2canvas.
 */
function convertToSrgb(val: string): string {
  if (!val || typeof val !== 'string') return val;
  if (!val.includes('oklch') && !val.includes('oklab') && !val.includes('color(')) {
    return val;
  }

  // Serialização via Canvas 2D nativo do browser (sempre converte para sRGB)
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = val;
      const parsed = ctx.fillStyle;
      if (parsed && !parsed.includes('oklch') && !parsed.includes('oklab')) {
        return parsed;
      }
    }
  } catch (e) {
    // prosseguir para regex de fallback
  }

  // Fallback regex para converter ocorrências individuais de oklch/oklab
  return val.replace(/(?:oklch|oklab|color)\([^)]+\)/g, (match) => {
    try {
      const c = document.createElement('canvas');
      const cx = c.getContext('2d');
      if (cx) {
        cx.fillStyle = '#000000';
        cx.fillStyle = match;
        const res = cx.fillStyle;
        if (res && !res.includes('oklch') && !res.includes('oklab')) return res;
      }
    } catch (err) {}

    // Fallbacks inteligentes baseados no tom aproximado
    if (match.includes('0.2') || match.includes('0.1') || match.includes('0.3')) return '#1e293b';
    if (match.includes('0.9') || match.includes('0.8')) return '#ffffff';
    return '#64748b';
  });
}

/**
 * Higieniza recursivamente os estilos computados de todos os nós de um elemento,
 * forçando valores em sRGB (rgb/rgba/hex) diretamente como inline styles com prioridade !important.
 */
function sanitizeElementColors(container: HTMLElement, doc: Document = document): void {
  const win = doc.defaultView || window;
  const elements = [container, ...Array.from(container.querySelectorAll('*'))] as HTMLElement[];

  const colorProperties = [
    'color',
    'background-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    'text-decoration-color',
    'fill',
    'stroke',
  ];

  elements.forEach((el) => {
    if (!el || !el.style) return;

    try {
      const computed = win.getComputedStyle(el);
      if (!computed) return;

      // 1. Sanitizar propriedades de cor
      for (const prop of colorProperties) {
        const val = computed.getPropertyValue(prop);
        if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color('))) {
          const srgb = convertToSrgb(val);
          el.style.setProperty(prop, srgb, 'important');
        }
      }

      // 2. Desativar sombras CSS que possam carregar cores oklch
      const shadow = computed.getPropertyValue('box-shadow');
      if (shadow && shadow !== 'none' && (shadow.includes('oklch') || shadow.includes('oklab'))) {
        el.style.setProperty('box-shadow', 'none', 'important');
      }

      // 3. Remover text-shadow com oklch
      const textShadow = computed.getPropertyValue('text-shadow');
      if (textShadow && textShadow !== 'none' && (textShadow.includes('oklch') || textShadow.includes('oklab'))) {
        el.style.setProperty('text-shadow', 'none', 'important');
      }
    } catch (e) {
      // Ignorar erros em nós isolados
    }
  });
}

/**
 * Renderiza o elemento HTML do currículo e devolve uma instância configurada do jsPDF (A4 - 210mm x 297mm).
 */
async function renderCVToPDFInstance(elementId: string = 'cv-printable-area'): Promise<jsPDF | null> {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error('Elemento do currículo não encontrado:', elementId);
    return null;
  }

  // Criar um container isolado fora da área visível mas ativo no DOM
  const offscreenContainer = document.createElement('div');
  offscreenContainer.id = 'cv-pdf-rendering-sandbox';
  offscreenContainer.style.position = 'fixed';
  offscreenContainer.style.left = '-10000px';
  offscreenContainer.style.top = '0';
  offscreenContainer.style.width = '210mm';
  offscreenContainer.style.minHeight = '297mm';
  offscreenContainer.style.backgroundColor = '#ffffff';
  offscreenContainer.style.zIndex = '-999999';
  offscreenContainer.style.opacity = '1';
  offscreenContainer.style.visibility = 'visible';
  offscreenContainer.style.display = 'block';

  const clone = originalElement.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.width = '210mm';
  clone.style.minHeight = '297mm';
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.boxShadow = 'none';

  offscreenContainer.appendChild(clone);
  document.body.appendChild(offscreenContainer);

  try {
    await new Promise((resolve) => setTimeout(resolve, 150));
    sanitizeElementColors(clone, document);

    const canvas = await html2canvas(clone, {
      scale: 2.0, // Alta resolução (aprox 300 DPI para impressão nítida)
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
      onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
        const styleTag = clonedDoc.createElement('style');
        styleTag.textContent = `
          *, *::before, *::after {
            box-shadow: none !important;
            text-shadow: none !important;
          }
        `;
        clonedDoc.head.appendChild(styleTag);

        sanitizeElementColors(clonedEl, clonedDoc);
        if (clonedDoc.body) {
          sanitizeElementColors(clonedDoc.body as HTMLElement, clonedDoc);
        }
      },
    });

    if (document.body.contains(offscreenContainer)) {
      document.body.removeChild(offscreenContainer);
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const renderHeight = (imgHeight * pdfWidth) / imgWidth;

    if (renderHeight <= pdfHeight + 4) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, renderHeight);
    } else {
      let heightLeft = renderHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, renderHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - renderHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, renderHeight);
        heightLeft -= pdfHeight;
      }
    }

    return pdf;
  } catch (err) {
    if (document.body.contains(offscreenContainer)) {
      document.body.removeChild(offscreenContainer);
    }
    console.error('Erro ao renderizar canvas para PDF:', err);
    return null;
  }
}

/**
 * Exporta o elemento HTML do currículo diretamente para um arquivo PDF no formato A4 (210mm x 297mm).
 */
export async function exportCVToPDF(
  elementId: string = 'cv-printable-area',
  candidateName: string = 'Curriculo'
): Promise<boolean> {
  try {
    const pdf = await renderCVToPDFInstance(elementId);
    if (!pdf) {
      alert('Não foi possível gerar o arquivo PDF. Por favor, tente novamente.');
      return false;
    }

    const safeName = candidateName
      .trim()
      .replace(/[^a-zA-Z0-9À-ÿ]/g, '_')
      .replace(/_+/g, '_');

    const fileName = `Curriculo_${safeName || 'Profissional'}.pdf`;

    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    return true;
  } catch (error) {
    console.error('Erro ao exportar o PDF:', error);
    alert('Ocorreu um erro ao gerar o arquivo PDF. Por favor, tente novamente.');
    return false;
  }
}

/**
 * Abre diretamente a janela nativa de impressão do navegador (window.print()).
 * Oculta todos os elementos de interface e exibe apenas a folha do currículo em tamanho real A4.
 * NÃO realiza download de nenhum arquivo no computador do usuário.
 */
export function printCVSafely(
  elementId: string = 'cv-printable-area',
  candidateName: string = 'Curriculo'
): boolean {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.warn('Elemento não encontrado para impressão:', elementId);
    try {
      window.print();
    } catch (e) {}
    return false;
  }

  const safeName = candidateName.trim() || 'Curriculo';

  // 1. Clona a folha do currículo em formato A4 puro (210mm x 297mm) sem sombras nem escalas
  const clone = originalElement.cloneNode(true) as HTMLElement;
  clone.id = 'cv-printable-area-clone';
  clone.style.transform = 'none';
  clone.style.margin = '0 auto';
  clone.style.boxShadow = 'none';
  clone.style.border = 'none';
  clone.style.width = '210mm';
  clone.style.minHeight = '297mm';
  clone.style.display = 'block';
  clone.style.visibility = 'visible';

  // Coleta as folhas de estilo da página para que fontes, cores e classes Tailwind sejam fiéis
  const styleTags = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((el) => el.outerHTML)
    .join('\n');

  const printDocumentHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Imprimir Currículo - ${safeName}</title>
  ${styleTags}
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #ffffff !important;
      color: #000000 !important;
      width: 100% !important;
    }
    #cv-printable-area-clone {
      width: 210mm !important;
      min-height: 297mm !important;
      margin: 0 auto !important;
      padding: 0 !important;
      box-shadow: none !important;
      border: none !important;
      transform: none !important;
    }
  </style>
</head>
<body>
  <div style="width: 210mm; min-height: 297mm; margin: 0 auto; background: #ffffff;">
    ${clone.outerHTML}
  </div>
  <script>
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 200);
    });
    window.addEventListener('afterprint', function() {
      setTimeout(function() {
        window.close();
      }, 300);
    });
  </script>
</body>
</html>`;

  // 2. Método Principal: abre uma janela limpa fora de qualquer iframe sandboxed
  // Esse método é universalmente aceito pelos navegadores quando disparado por clique do usuário
  let printWindow: Window | null = null;
  try {
    printWindow = window.open('', '_blank', 'width=950,height=850,menubar=no,toolbar=no,location=no,status=no');
  } catch (openErr) {
    printWindow = null;
  }

  if (printWindow && !printWindow.closed) {
    try {
      printWindow.document.open();
      printWindow.document.write(printDocumentHtml);
      printWindow.document.close();
      return true;
    } catch (writeErr) {
      console.warn('Falha ao escrever no documento de impressão:', writeErr);
    }
  }

  // 3. Fallback caso a abertura de nova janela seja bloqueada por política de popup:
  // Aciona a impressão direta na janela atual via portal dedicado
  let printPortal = document.getElementById('cv-direct-print-portal');
  if (!printPortal) {
    printPortal = document.createElement('div');
    printPortal.id = 'cv-direct-print-portal';
    document.body.appendChild(printPortal);
  }

  printPortal.innerHTML = '';
  printPortal.appendChild(clone);
  document.body.classList.add('printing-cv');

  const cleanup = () => {
    document.body.classList.remove('printing-cv');
    if (printPortal && document.body.contains(printPortal)) {
      printPortal.innerHTML = '';
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  try {
    window.focus();
    window.print();
  } catch (err) {
    console.warn('Falha ao chamar window.print() no documento principal:', err);
  }

  setTimeout(cleanup, 2500);
  return true;
}

