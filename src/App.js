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
  return <div className="list">LIST</div>
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 Você tem X itens em sua lista, e já fez as malas X (X%)</em>
    </footer>
  )
}
