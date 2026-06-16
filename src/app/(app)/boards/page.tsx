import Column from "@/app/components/column";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function Boards() {
  const board = {
    columns: [
      { id: 1, name: "Column 1", cards: [] },
      { id: 2, name: "Column 2", cards: [] },
      { id: 3, name: "Column 3", cards: [] }
    ]
  }

  return (
    <main className="min-h-screen grid grid-cols-1">
      <section className="h-16">
        <Navbar />
      </section>

      <section className="w-full grid grid-cols-4 gap-4">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </section>

      <section className="h-16">
        <Footer />
      </section>
    </main>
  )
}