import { useState } from 'react'

export default function App() {
  const [items, setItems] = useState([])

  function handleClearList() {
    setItems([])
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <h1>🌴🏖️ Longe de Casa 👜</h1>
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(event) {
    event.preventDefault()
    if (!description) return
    const newItem = { description, quantity, packed: false, id: Date.now() }
    setDescription('')
    setQuantity(1)
    onAddItems(newItem)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>O que você precisa para sua viagem? 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input')
  if (items.length === 0) {
    return <div className="list"></div>
  }
  let sortedItems
  if (sortBy === 'input') sortedItems = items.slice().sort()
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description))
  if (sortBy === 'packed')
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed)

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Ordenar de Entrada</option>
          <option value="description">Ordenar por nome</option>
          <option value="packed">Ordenar por Status</option>
        </select>
        <button onClick={onClearList}>Limpar Lista</button>
      </div>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Comece adicionando um item na sua cesta!</em>
      </p>
    )
  }

  const qtdItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const percent = Math.round((numPacked / qtdItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? 'Você está pronto para viajar! ✈️'
          : `👜 Você tem ${qtdItems} itens em sua lista, e na sua mala já tem
  ${numPacked} itens (${percent}%)`}
      </em>
    </footer>
  )
}
