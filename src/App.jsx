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
    text: "Подберём компоненты под музыку, автомобиль и бюджет. Установим, настроим и заставим систему играть цельно.",
    tags: ["подбор", "установка", "настройка"],
  },
  {
    id: "02",
    title: "Шумоизоляция",
    text: "Убираем вибрации, дорожный гул и призвуки салона. Музыка становится чище, а поездки — заметно тише.",
    tags: ["двери", "пол", "багажник"],
  },
  {
    id: "03",
    title: "Электрика",
    text: "Питание, проводка, свет, камеры и дополнительное оборудование — аккуратно, безопасно и с гарантией.",
    tags: ["проводка", "свет", "доп. оборудование"],
  },
  {
    id: "04",
    title: "Тюнинг",
    text: "Нештатные решения для авто и мото: от подсветки до индивидуального изготовления акустических подиумов.",
    tags: ["авто", "мото", "кастом"],
  },
];

const projects = [
  { src: image("work-08.jpg"), label: "Harley-Davidson", note: "Музыка и свет", shape: "tall" },
  { src: image("work-11.jpg"), label: "Volkswagen", note: "Мультимедиа", shape: "wide" },
  { src: image("work-05.jpg"), label: "Подбор компонентов", note: "Pride · Dynamic State", shape: "small" },
  { src: image("work-09.jpg"), label: "Скрытый монтаж", note: "Без лишних следов", shape: "small" },
  { src: image("work-12.jpg"), label: "Hyundai", note: "Дополнительный свет", shape: "wide" },
];

const faqs = [
  ["Можно приехать со своими компонентами?", "Да. Проверим совместимость, оценим комплект и предложим грамотную схему установки."],
  ["Сколько занимает установка?", "Зависит от состава системы. Базовая установка обычно занимает один рабочий день, сложные проекты согласуем отдельно."],
  ["Есть гарантия на работу?", "Да, на все выполненные работы студия предоставляет гарантию и полный фотоотчёт."],
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
  const [goal, setGoal] = useState("Хочу громче");
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
            <div className="eyebrow"><span>Студия автозвука</span><span>Челябинск</span></div>
            <h1>
              Звук, который
              <span>чувствуется</span>
              кожей.
            </h1>
            <div className="hero-bottom">
              <p>Собираем системы без случайных компонентов. От спокойного SQ до громкого повседнева.</p>
              <a className="round-link" href="#contact" aria-label="Обсудить проект"><ArrowDown /></a>
            </div>
          </div>
          <div className="hero-visual">
            <img src={image("work-08.jpg")} alt="Проект SAVA Audio для Harley-Davidson" />
            <div className="hero-gradient" />
            <div className="live-sound"><span /><b>Сейчас в работе</b><small>индивидуальный проект</small></div>
            <Wave />
            <div className="hero-stamp"><Zap size={16} /> ГАРАНТИЯ<br />НА РАБОТУ</div>
          </div>
          <div className="scroll-note">Листайте, чтобы услышать больше <ArrowDown size={14} /></div>
        </section>

        <section className="statement section-pad" data-reveal>
          <span className="section-index">/ 01 — Подход</span>
          <div>
            <p>Не ставим «что погромче».</p>
            <h2>Настраиваем характер звука <em>под вас.</em></h2>
          </div>
          <aside>6+ лет в автозвуке<br /><b>Полный фотоотчёт</b></aside>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-head" data-reveal>
            <span className="section-index">/ 02 — Что делаем</span>
            <h2>Всё, что делает<br />автомобиль <i>вашим.</i></h2>
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
            <span className="section-index">/ 03 — Из студии</span>
            <h2>Сделано здесь.<br /><i>Не на рендере.</i></h2>
            <p>Реальные машины, реальные инсталляции и ни одного стокового кадра.</p>
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
            Больше работ во ВКонтакте <ArrowRight />
          </a>
        </section>

        <section className="process section-pad" id="process">
          <div className="section-head" data-reveal>
            <span className="section-index">/ 04 — Процесс</span>
            <h2>Без магии.<br /><i>Просто грамотно.</i></h2>
          </div>
          <div className="process-track" data-reveal>
            {[
              ["01", "Слушаем", "Узнаём, что вы слушаете и какой результат хотите получить."],
              ["02", "Считаем", "Предлагаем несколько решений и фиксируем понятную смету."],
              ["03", "Собираем", "Устанавливаем без компромиссов и отправляем фотоотчёт."],
              ["04", "Настраиваем", "Финально настраиваем систему и отдаём с гарантией."],
            ].map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="consult section-pad" id="contact">
          <div className="consult-copy" data-reveal>
            <span className="section-index">/ 05 — Ваш проект</span>
            <h2>Давайте<br /><i>послушаем.</i></h2>
            <p>Расскажите, чего не хватает штатной системе. Александр бесплатно подберёт решение и сориентирует по бюджету.</p>
            <div className="direct-links">
              <a href="tel:+79227358523"><Phone /><span><small>Позвонить</small>+7 922 735-85-23</span></a>
              <a href="https://vk.ru/savaaudio" target="_blank" rel="noreferrer"><MessageCircle /><span><small>Написать</small>ВКонтакте</span></a>
            </div>
          </div>
          <form name="project" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submitForm} data-reveal>
            <input type="hidden" name="form-name" value="project" />
            <input type="hidden" name="goal" value={goal} />
            <p className="hidden-field"><label>Не заполняйте <input name="bot-field" /></label></p>
            <span className="form-step">01 / Что хочется изменить?</span>
            <div className="goal-picker">
              {["Хочу громче", "Хочу качественнее", "Нужна консультация"].map((item) => (
                <button type="button" className={goal === item ? "is-selected" : ""} onClick={() => setGoal(item)} key={item}>{item}</button>
              ))}
            </div>
            <span className="form-step">02 / Как с вами связаться?</span>
            <label><span>Ваше имя</span><input name="name" required placeholder="Алексей" /></label>
            <label><span>Телефон</span><input name="phone" required type="tel" placeholder="+7 999 000-00-00" /></label>
            <button className="submit-button" disabled={status === "loading" || status === "sent"}>
              {status === "loading" ? "Отправляем..." : status === "sent" ? "Открыли диалог во VK" : "Обсудить проект"} <ArrowRight />
            </button>
            {status === "error" && <p className="form-error">Не удалось отправить. Позвоните нам по номеру выше.</p>}
            <small className="privacy">Нажимая кнопку, вы соглашаетесь на обработку данных.</small>
          </form>
        </section>

        <section className="faq section-pad">
          <span className="section-index">/ Коротко о важном</span>
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
        <div className="footer-bottom"><span>© 2026 SAVA AUDIO</span><span>ЗВУК · СВЕТ · ХАРАКТЕР</span></div>
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
