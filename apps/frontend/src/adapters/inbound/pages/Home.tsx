import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaClock,
  FaMobileAlt,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
import "../../../styles/home.css";
import Avatar from "../components/Avatar";

const Home: React.FC = () => {
  const [fontSize, setFontSize] = useState(1);

  const increaseFontSize = () => {
    if (fontSize < 1.5) setFontSize(fontSize + 0.1);
  };

  const decreaseFontSize = () => {
    if (fontSize > 0.8) setFontSize(fontSize - 0.1);
  };

  // Mock posts
  const posts = [
    {
      id: 1,
      title: "Melhores práticas para desenvolvimento web",
      description:
        "Descubra como aplicar boas práticas para otimizar seus projetos e torná-los mais eficientes.",
      date: "12 de Fevereiro de 2025",
    },
    {
      id: 2,
      title: "Como utilizar arquitetura hexagonal em seus projetos",
      description:
        "Aprenda a estruturar seu código utilizando arquitetura hexagonal e seus benefícios.",
      date: "28 de Janeiro de 2025",
    },
    {
      id: 3,
      title: "Guia completo sobre acessibilidade na web",
      description:
        "Saiba como tornar seus sites acessíveis para todos os usuários e cumprir os padrões WCAG.",
      date: "15 de Janeiro de 2025",
    },
  ];

  // Importa o plugin automaticamente
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:3002/plugin.js"; // URL do servidor do plugin
    script.async = true;
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--dynamic-font-size",
      `${fontSize}em`
    );
  }, [fontSize]);

  return (
    <div className="home-container">
      <main className="home-content" style={{ fontSize: `${fontSize}em` }}>
        {/* Seção de Controles de Acessibilidade */}
        <div className="accessibility-controls">
          <button onClick={decreaseFontSize} aria-label="Diminuir fonte">
            A-
          </button>
          <button onClick={increaseFontSize} aria-label="Aumentar fonte">
            A+
          </button>
        </div>

        {/* Avatar e Seção Sobre Mim */}
        <div className="avatar-section">
          <Avatar
            src="/images/my-profile.jpeg"
            alt="Meu Perfil"
            size="xlarge"
          />
        </div>

        <h2 className="section-title">Sobre Mim</h2>
        <section id="about-me">
          <p className="section-text">
            Desenvolvedor Fullstack | Especialista em Web e Mobile
            <br /> <br />
            Minha jornada na tecnologia começou em 2019, explorando a
            programação com projetos que desafiavam minha criatividade e lógica.
            Com o tempo, migrei meu foco para o desenvolvimento web e backend,
            onde encontrei minha verdadeira paixão: criar soluções escaláveis e
            eficientes. Hoje, transformo ideias em projetos robustos,
            gerenciando todo o ciclo de desenvolvimento — da concepção à
            implantação — sempre com o objetivo de entregar produtos inovadores
            e de alto impacto.
          </p>
        </section>

        {/* Seção de Depoimentos */}
        <section id="testimonials">
          <h2 className="section-title">Depoimentos</h2>
          <p className="section-text">
            Veja o que profissionais e empresas dizem sobre minha experiência,
            comprometimento e impacto nos projetos que desenvolvi.
          </p>
          <div className="testimonial-grid">
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Vinicius deixou muitas contribuições importantes na Adopets.
                Sua jornada foi concluída com sucesso. Espero poder encontrá-lo
                em uma próxima etapa na sua carreira, que certamente é de
                ascensão!"
              </p>
              <div className="testimonial-user">
                <Avatar src="/images/andre.jpeg" size="small" />
                <div className="testimonial-info">
                  <strong>André Martins</strong>
                  <span>
                    Cofounder & CTO at Pet Loyalty | Techstars Boston 2019
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Trabalhei com Vinicius Parizoto na Clientbase. Ele é uma pessoa
                incrível, muito proativo, estudioso e busca sempre se
                desenvolver!"
              </p>
              <div className="testimonial-user">
                <Avatar src="/images/sky.jpeg" size="small" />
                <div className="testimonial-info">
                  <strong>Matheus Klinkonsky</strong>
                  <span>Senior Software Engineer</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Vinicius é um ótimo desenvolvedor além de grande companheiro de
                equipe! Sabe desempenhar bem as tarefas e tem amor ao time onde
                estiver. Espero apenas sucesso em sua carreira!"
              </p>
              <div className="testimonial-user">
                <Avatar src="/images/ale.jpeg" size="small" />
                <div className="testimonial-info">
                  <strong>Alexandre Correa de Oliveira</strong>
                  <span>Lead Software Engineer | Front-end technologies</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Cases de Sucesso */}
        <section id="success-cases">
          <h2 className="section-title">Cases de Sucesso</h2>
          <p className="section-text">
            Confira alguns dos projetos incríveis que já desenvolvi.
          </p>
          <div className="case-grid">
            {/* Case 1: Plataforma de Gestão de Frete */}
            <div className="case-card">
              <div className="case-icon">
                <FaTruck />
              </div>
              <p>Plataforma de Gestão de Frete (Fiat)</p>
            </div>

            {/* Case 2: Aplicativo Mobile para Finanças */}
            <div className="case-card">
              <div className="case-icon">
                <FaMobileAlt />
              </div>
              <p>Aplicativo Mobile para Controle de Finanças</p>
            </div>

            {/* Case 3: Sistema de Automação para E-commerce */}
            <div className="case-card">
              <div className="case-icon">
                <FaShoppingCart />
              </div>
              <p>Sistema de Automação para E-commerce</p>
            </div>

            {/* Case 4: Dashboard de Análises de Dados */}
            <div className="case-card">
              <div className="case-icon">
                <FaChartLine />
              </div>
              <p>Dashboard de Análises de Dados</p>
            </div>
          </div>
        </section>

        {/* Seção de Posts */}
        <section id="latest-posts">
          <h2 className="section-title">Últimas Postagens</h2>
          <p className="section-text">
            Confira os conteúdos mais recentes sobre tecnologia e
            desenvolvimento.
          </p>
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
                <div className="post-footer">
                  <FaClock className="post-icon" />
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
