// Turns one DOM element (the invoice card) into an A4 PDF. Only that element is captured, so none of
// the surrounding page ends up in the file. The libraries load on demand: they are only needed when
// someone presses "Download invoice".
const A4_MM = { width: 210, height: 297 }
const MARGIN_MM = 10

export const invoiceFileName = (invoiceNumber) => {
  const safe = String(invoiceNumber || '').replace(/[^\w؀-ۿ-]+/g, '-').replace(/^-+|-+$/g, '')
  return `invoice-${safe || 'jabel'}.pdf`
}

export const downloadElementAsPdf = async (element, fileName) => {
  if (!element) throw new Error('Invoice element not found')
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas-pro'), import('jspdf')])
  if (document.fonts?.ready) await document.fonts.ready

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
    // Capture the card flat: the on-screen frame (border, shadow, rounded corners) is not part of the invoice.
    onclone: (doc) => {
      const card = doc.getElementById(element.id)
      if (!card) return
      card.style.border = 'none'
      card.style.boxShadow = 'none'
      card.style.borderRadius = '0'
    },
  })

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true })
  const contentWidth = A4_MM.width - MARGIN_MM * 2
  const pageContentHeight = A4_MM.height - MARGIN_MM * 2
  const mmPerPx = contentWidth / canvas.width
  const totalHeightMm = canvas.height * mmPerPx

  // One page when it fits (the usual case); otherwise slice the picture page by page.
  let offsetMm = 0
  let page = 0
  while (offsetMm < totalHeightMm - 0.5) {
    const sliceMm = Math.min(pageContentHeight, totalHeightMm - offsetMm)
    const slicePx = Math.round(sliceMm / mmPerPx)
    const slice = document.createElement('canvas')
    slice.width = canvas.width
    slice.height = slicePx
    slice.getContext('2d').drawImage(canvas, 0, Math.round(offsetMm / mmPerPx), canvas.width, slicePx, 0, 0, canvas.width, slicePx)
    if (page > 0) pdf.addPage()
    pdf.addImage(slice.toDataURL('image/jpeg', 0.95), 'JPEG', MARGIN_MM, MARGIN_MM, contentWidth, sliceMm)
    offsetMm += sliceMm
    page += 1
  }
  pdf.save(fileName)
}
