import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = () => {
  const [cart, setCart] = useState([]); // Estado para o carrinho
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla se o carrinho está aberto ou fechado
  const [animateCartButton, setAnimateCartButton] = useState(false); // Controla a animação do botão "Ver Pedido"

  const color = "#b31e1e"; // Definição da cor para o botão de animação

  const handleAddToCart = (item) => {
    setCart([...cart, item]); // Adiciona o item ao carrinho
    setAnimateCartButton(true); // Inicia a animação de piscada
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart(cart.filter(item => item !== itemToRemove)); // Remove item do carrinho
  };

  const handleCloseCart = () => {
    setIsCartOpen(false); // Fecha o carrinho
  };

  const handleFinalizeOrder = () => {
    const orderMessage = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n\n` +
      cart.map(item => `${item.nome} - R$${item.preco.toFixed(2)}`).join('\n') +
      `\n\nTotal: R$${(cart.reduce((total, item) => total + item.preco, 0)).toFixed(2)} (A ser combinado com o frete)`
    );
    window.open(`https://wa.me/5522992446988?text=${orderMessage}`, '_blank');
  };

  const pastas = [
    { categoria: 'Pastéis Simples', items: [
      { nome: 'Delícia do Sertão', preco: 14.50, descricao: 'Catupiry, frango desfiado e bacon' },
      { nome: 'Sabor Italiano', preco: 15.00, descricao: 'Presunto, queijo e orégano' },
      { nome: 'Mineirinho', preco: 15.50, descricao: 'Carne moída, queijo, presunto e milho' },
      { nome: 'Franguito', preco: 15.00, descricao: 'Frango com queijo e orégano' },
    ] },
    { categoria: 'Pastéis Doces', items: [
      { nome: 'Brigadeiro', preco: 10.00, descricao: 'Chocolate ao leite' },
      { nome: 'Nutella + Fruta', preco: 15.00, descricao: 'Creme de Nutella mais uma fruta (banana ou morango)' },
      { nome: 'Banana com Canela', preco: 11.00, descricao: 'Banana, queijo e canela em pó' },
    ] },
    { categoria: 'Bebidas', items: [
      { nome: 'Refrigerante Lata', preco: 6.00 },
      { nome: 'Guaravita', preco: 2.50 },
      { nome: 'Água com Gás', preco: 3.00 },
    ] },
  ];

  useEffect(() => {
    // A animação de "flash" no botão "Ver Pedido" ocorre apenas uma vez quando o carrinho recebe um item
    if (animateCartButton) {
      const timeout = setTimeout(() => {
        setAnimateCartButton(false); // Para a animação depois de um tempo
      }, 500); // A animação dura meio segundo (500ms)
      return () => clearTimeout(timeout); // Limpa o timeout
    }
  }, [animateCartButton]);

  return (
    <div className="menu">
      <h2>Cardápio</h2>
      {pastas.map((pasta, index) => (
        <div key={index} className="menu-category">
          <h3>{pasta.categoria}</h3>
          <ul>
            {pasta.items.map((item, idx) => (
              <li key={idx}>
                <div className="item-info">
                  <strong className="item-name">{item.nome}</strong>
                  <p className="item-description">{item.descricao}</p>
                  <p className="item-price">R${item.preco.toFixed(2)}</p>
                </div>
                <button onClick={() => handleAddToCart(item)}>Adicionar ao Pedido</button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Carrinho Modal */}
      {isCartOpen && (
        <div className="cart-modal">
          <button className="close-cart" onClick={handleCloseCart}>Fechar Carrinho</button>
          <h2>Seu Pedido</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.nome} - R${item.preco.toFixed(2)}
                  <button className="remove-item" onClick={() => handleRemoveFromCart(item)}>Remover</button>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <p>
              Total: R${cart.reduce((total, item) => total + item.preco, 0).toFixed(2)} (A ser combinado com o frete)
            </p>
          )}

          {/* Renderiza o botão "Finalizar Pedido" apenas se houver mais de 0 itens */}
          {cart.length > 0 && (
            <button style={{ background: "#b31e1e", color: "white" }} className="finalize-order" onClick={handleFinalizeOrder}>
              Finalizar Pedido por WhatsApp
            </button>
          )}
        </div>
      )}

      {/* Botão fixo de "Ver Pedido", que só aparece quando o carrinho não está aberto */}
      {!isCartOpen && (
        <button
          className={`view-cart ${animateCartButton ? 'animate' : ''}`}
          style={{ backgroundColor: color }}  // Adicionando o estilo de cor aqui
          onClick={() => setIsCartOpen(true)}
        >
          Ver Pedido
        </button>
      )}
    </div>
  );
};

export default Menu;
