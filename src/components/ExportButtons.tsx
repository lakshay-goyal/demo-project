import { Button } from "@/components/ui/button"
import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'
import { jsPDF } from "jspdf"
import "jspdf-autotable"

interface ExportButtonsProps {
  data: any[]
}

export default function ExportButtons({ data }: ExportButtonsProps) {
  const exportPDF = () => {
    const doc = new jsPDF()
    doc.autoTable({
      head: [['Author', 'Title', 'Type', 'Published At']],
      body: data.map(item => [item.author, item.title, item.type, item.publishedAt]),
    })
    doc.save('articles.pdf')
  }

  const exportCSV = () => {
    const ws = utils.json_to_sheet(data)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, "Articles")
    const wbout = write(wb, { bookType: 'csv', type: 'binary' })
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'articles.csv')
  }

  const exportGoogleSheets = () => {
    // In a real application, you would integrate with Google Sheets API here
    console.log('Exporting to Google Sheets...')
  }

  // Utility function for CSV export
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }

  return (
    <div className="mt-8 flex gap-4">
      <Button onClick={exportPDF}>Export as PDF</Button>
      <Button onClick={exportCSV}>Export as CSV</Button>
      <Button onClick={exportGoogleSheets}>Export to Google Sheets</Button>
    </div>
  )
}

