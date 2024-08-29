export function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Comece adicionando um item na sua cesta!</em>
      </p>
    );
  }

  const qtdItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / qtdItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "Você está pronto para viajar! ✈️"
          : `👜 Você tem ${qtdItems} itens em sua lista, e na sua mala já tem
  ${numPacked} itens (${percent}%)`}
      </em>
    </footer>
  );
}
