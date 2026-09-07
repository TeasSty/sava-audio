import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  X,
  Zap,
} from "lucide-react";

const image = (name) => `${import.meta.env.BASE_URL}images/${name}`;

const services = [
  {
    id: "01",
    title: "Автозвук",
    text: "Расскажите, что слушаете и сколько готовы потратить. Соберём комплект без лишних позиций, поставим и настроим.",
    tags: ["подберём", "поставим", "настроим"],
  },
  {
    id: "02",
    title: "Шумоизоляция",
    text: "Проклеим двери, пол или весь салон. В машине станет тише, а динамики перестанут играть вместе с обшивкой.",
    tags: ["двери", "пол", "весь салон"],
  },
  {
    id: "03",
    title: "Электрика",
    text: "Подключим питание, свет, камеру или другое оборудование. Провода спрячем, соединения подпишем — колхоза не будет.",
    tags: ["проводка", "свет", "камеры"],
  },
  {
    id: "04",
    title: "Тюнинг",
    text: "Делаем то, чего не было с завода: подсветку, акустические подиумы и другие штуки для авто и мото.",
    tags: ["авто", "мото", "на заказ"],
  },
];

const projects = [
  { src: image("work-08.jpg"), label: "Harley-Davidson", note: "Поставили музыку и свет", shape: "tall" },
  { src: image("work-11.jpg"), label: "Volkswagen", note: "Заменили мультимедиа", shape: "wide" },
  { src: image("work-05.jpg"), label: "Железо в наличии", note: "Pride · Dynamic State", shape: "small" },
  { src: image("work-09.jpg"), label: "Внутри Harley", note: "Проводка и шумоизоляция", shape: "small" },
  { src: image("work-12.jpg"), label: "Hyundai", note: "Добавили света", shape: "wide" },
];

const faqs = [
  ["Можно приехать со своим железом?", "Конечно. Посмотрим, что с чем дружит, и честно скажем, если в комплекте чего-то не хватает или что-то лишнее."],
  ["Сколько машина пробудет у вас?", "Простую установку обычно делаем за день. Если проект большой, заранее скажем точный срок — сюрпризов не будет."],
  ["А гарантия есть?", "Есть. За свою работу отвечаем. По ходу установки фотографируем всё, что потом скроется под обшивкой."],
];

function Wave() {
  return (
    <div className="wave" aria-hidden="true">
      {[10, 20, 36, 18, 58, 82, 38, 68, 100, 52, 76, 34, 88, 42, 62, 18, 30, 12].map((h, i) => (
        <i key={i} style={{ "--h": `${h}%`, "--d": `${i * 45}ms` }} />
      ))}
    </div>
  );
}

function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#top" aria-label="SAVA Audio — наверх">
      <img src={image("logo.jpg")} alt="" />
      <span><b>SAVA</b><em>AUDIO</em></span>
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [goal, setGoal] = useState("Нужно погромче");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || lightbox !== null);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen, lightbox]);

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus("loading");
    if (window.location.hostname.endsWith("github.io")) {
      window.open("https://vk.me/savaaudio", "_blank", "noopener,noreferrer");
      setStatus("sent");
      return;
    }
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <header className="site-header">
        <Brand compact />
        <nav className="desktop-nav" aria-label="Главная навигация">
          <a href="#services">Услуги</a>
          <a href="#projects">Проекты</a>
          <a href="#process">Как работаем</a>
        </nav>
        <a className="header-phone" href="tel:+79227358523"><Phone size={15} /> +7 922 735-85-23</a>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><Menu /></button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X /></button>
        <Brand />
        <nav>
          {["services", "projects", "process", "contact"].map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <small>0{i + 1}</small>{["Услуги", "Проекты", "Как работаем", "Контакты"][i]}
            </a>
          ))}
        </nav>
      </div>

      <main>
        <section className="hero" id="top">
          <div className="hero-noise" />
          <div className="hero-copy">
            <div className="eyebrow"><span>SAVA_audio</span><span>Челябинск</span></div>
            <h1>
              Сделаем, чтобы
              <span>заиграло.</span>
              Как надо.
            </h1>
            <div className="hero-bottom">
              <p>Сначала разберёмся, что вам нужно. Потом подберём железо, поставим и настроим. Без покупок наугад.</p>
              <a className="round-link" href="#contact" aria-label="Обсудить проект"><ArrowDown /></a>
            </div>
          </div>
          <div className="hero-visual">
            <img src={image("work-08.jpg")} alt="Проект SAVA Audio для Harley-Davidson" />
            <div className="hero-gradient" />
            <div className="live-sound"><span /><b>Из нашей мастерской</b><small>Harley-Davidson</small></div>
            <Wave />
            <div className="hero-stamp"><Zap size={16} /> ГАРАНТИЯ<br />НА РАБОТУ</div>
          </div>
          <div className="scroll-note">Ниже — что мы умеем <ArrowDown size={14} /></div>
        </section>

        <section className="statement section-pad" data-reveal>
          <span className="section-index">/ 01 — В двух словах</span>
          <div>
            <p>Коробки сами по себе не играют.</p>
            <h2>Важно, кто и как всё это <em>поставил.</em></h2>
          </div>
          <aside>В деле больше 6 лет<br /><b>Каждый этап — на фото</b></aside>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-head" data-reveal>
            <span className="section-index">/ 02 — Что делаем</span>
            <h2>Звук, тишина<br />и всё <i>по электрике.</i></h2>
          </div>
          <div className="services-list" data-reveal>
            {services.map((service, index) => (
              <article
                key={service.id}
                className={activeService === index ? "is-active" : ""}
                onMouseEnter={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
              >
                <button aria-expanded={activeService === index}>
                  <span>{service.id}</span>
                  <h3>{service.title}</h3>
                  <Plus />
                </button>
                <div className="service-detail">
                  <p>{service.text}</p>
                  <div>{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="projects-intro section-pad" data-reveal>
            <span className="section-index">/ 03 — Недавние работы</span>
            <h2>Вот чем были<br /><i>заняты.</i></h2>
            <p>Снимаем сами, обычно прямо в мастерской. Поэтому здесь всё настоящее — и машины, и рабочий беспорядок.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <button
                className={`project ${project.shape}`}
                key={project.src}
                onClick={() => setLightbox(index)}
                data-reveal
              >
                <img src={project.src} alt={`${project.label} — ${project.note}`} loading="lazy" />
                <span><b>{project.label}</b><small>{project.note}</small></span>
                <i><Plus /></i>
              </button>
            ))}
          </div>
          <a className="vk-link" href="https://vk.ru/savaaudio" target="_blank" rel="noreferrer">
            Остальные работы — во ВКонтакте <ArrowRight />
          </a>
        </section>

        <section className="process section-pad" id="process">
          <div className="section-head" data-reveal>
            <span className="section-index">/ 04 — Как всё будет</span>
            <h2>Сначала обсудим.<br />Потом <i>полезем в машину.</i></h2>
          </div>
          <div className="process-track" data-reveal>
            {[
              ["01", "Разговариваем", "Что слушаете, чего не хватает сейчас и сколько готовы потратить."],
              ["02", "Считаем", "Показываем варианты. Вы выбираете, мы называем итоговую сумму."],
              ["03", "Ставим", "Работаем с машиной и присылаем фотографии того, что скрыто внутри."],
              ["04", "Проверяем", "Всё настраиваем, слушаем вместе с вами и только потом отдаём ключи."],
            ].map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="consult section-pad" id="contact">
          <div className="consult-copy" data-reveal>
            <span className="section-index">/ 05 — Есть вопрос?</span>
            <h2>Звоните.<br /><i>Разберёмся.</i></h2>
            <p>Можно без списка компонентов и специальных терминов. Просто расскажите, что не устраивает. Александр подскажет, с чего начать и во сколько это обойдётся.</p>
            <div className="direct-links">
              <a href="tel:+79227358523"><Phone /><span><small>Позвонить</small>+7 922 735-85-23</span></a>
              <a href="https://vk.ru/savaaudio" target="_blank" rel="noreferrer"><MessageCircle /><span><small>Написать</small>ВКонтакте</span></a>
            </div>
          </div>
          <form name="project" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submitForm} data-reveal>
            <input type="hidden" name="form-name" value="project" />
            <input type="hidden" name="goal" value={goal} />
            <p className="hidden-field"><label>Не заполняйте <input name="bot-field" /></label></p>
            <span className="form-step">01 / С чего начнём?</span>
            <div className="goal-picker">
              {["Нужно погромче", "Хочу чистый звук", "Пока не знаю"].map((item) => (
                <button type="button" className={goal === item ? "is-selected" : ""} onClick={() => setGoal(item)} key={item}>{item}</button>
              ))}
            </div>
            <span className="form-step">02 / Куда вам позвонить?</span>
            <label><span>Ваше имя</span><input name="name" required placeholder="Алексей" /></label>
            <label><span>Телефон</span><input name="phone" required type="tel" placeholder="+7 999 000-00-00" /></label>
            <button className="submit-button" disabled={status === "loading" || status === "sent"}>
              {status === "loading" ? "Секунду..." : status === "sent" ? "Открыли сообщения VK" : "Хочу посоветоваться"} <ArrowRight />
            </button>
            {status === "error" && <p className="form-error">Не удалось отправить. Позвоните нам по номеру выше.</p>}
            <small className="privacy">Нажимая кнопку, вы соглашаетесь на обработку данных.</small>
          </form>
        </section>

        <section className="faq section-pad">
          <span className="section-index">/ Часто спрашивают</span>
          <div>
            {faqs.map(([question, answer], index) => (
              <article className={openFaq === index ? "is-open" : ""} key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  {question}<ChevronDown />
                </button>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <Brand />
          <p><MapPin /> Челябинск,<br />ул. Молодогвардейцев, 1Б/6</p>
          <div><small>Работаем</small><b>до 19:00</b></div>
          <a className="route-link" href="https://yandex.ru/maps/?text=Челябинск%20Молодогвардейцев%201Б%2F6" target="_blank" rel="noreferrer">Построить маршрут <ArrowRight /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 SAVA AUDIO</span><span>АВТОЗВУК · ЭЛЕКТРИКА · ТЮНИНГ</span></div>
      </footer>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Закрыть"><X /></button>
          <img src={projects[lightbox].src} alt={projects[lightbox].label} onClick={(e) => e.stopPropagation()} />
          <p>{projects[lightbox].label} <span>{projects[lightbox].note}</span></p>
        </div>
      )}
    </>
  );
}
