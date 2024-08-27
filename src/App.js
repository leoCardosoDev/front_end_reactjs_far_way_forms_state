const initialItems = [
  { id: 1, description: 'Passaportes', quantity: 2, packed: false },
  { id: 2, description: 'Meias', quantity: 12, packed: true },
  { id: 3, description: 'Carregador', quantity: 1, packed: false },
]

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🌴🏖️ Longe de Casa 👜</h1>
}

function Form() {
  return (
    <div className="add-form">
      <h3>O que você precisa para sua viagem?😍</h3>
    </div>
  )
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 Você tem X itens em sua lista, e já fez as malas X (X%)</em>
    </footer>
  )
}
