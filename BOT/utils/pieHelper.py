import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

mpl.rcParams["legend.frameon"] = False


plt.rcParams['patch.edgecolor'] = '#EDEFF3'
dpi = plt.rcParams['figure.dpi']

sns.set()

top200 = [
    'Пользователь ПК', 'Работа в команде', 'Грамотная речь',
    'Ведение переговоров', 'Активные продажи', 'Поиск и привлечение клиентов',
    'Деловое общение', 'Телефонные переговоры', 'Деловая переписка',
    'Навыки продаж', 'Заключение договоров', 'Организаторские навыки',
    'Развитие продаж', 'Прямые продажи', 'Английский язык', 'B2B Продажи',
    'Ответственность', 'Холодные продажи', 'Управление продажами',
    'Умение работать в команде', 'Коммуникабельность', 'Деловая коммуникация',
    '1С: Предприятие 8', 'Проведение презентаций', 'Управление проектами',
    'Клиентоориентированность', 'Управление персоналом', 'Грамотность',
    'Ориентация на результат', '1С: Бухгалтерия', 'Планирование продаж',
    'Работа с большим объемом информации', 'Обучение и развитие',
    'Обучение персонала', 'AutoCAD', 'Стрессоустойчивость', 'Adobe Photoshop',
    'Консультирование', 'Навыки презентации', 'Делопроизводство',
    'Первичная документация', 'Подбор персонала', 'Бухгалтерская отчетность',
    'Документооборот', 'MS Outlook', 'MS PowerPoint', 'CRM', 'MS Excel',
    'Документальное сопровождение', 'Креативность', 'JavaScript',
    'Кассовые операции', 'Холодные звонки',
    'Первичная бухгалтерская документация', 'работа с текущей базой клиентов',
    'SQL', 'Руководство коллективом', 'Навыки межличностного общения',
    'Управление командой', 'Работа с оргтехникой',
    'Работа с дебиторской задолженностью',
    'Водительское удостоверение категории B', 'Git',
    'Обеспечение жизнедеятельности офиса', 'Налоговая отчетность',
    'Расчет заработной платы', 'Работа с кассой', 'HTML',
    'Знание устройства автомобиля', '1С: Торговля', 'Мотивация персонала',
    'Контроль качества', 'Аналитика продаж', 'Консультирование клиентов',
    'Поиск информации в интернет', 'Консультирование клиентов по телефону',
    'Организация мероприятий', 'B2C продажи', 'Навыки переговоров', 'CSS',
    'Исполнительность', 'Кадровое делопроизводство', 'Бухгалтерский учет',
    '1С: Документооборот', 'Работа с людьми', 'Строительство',
    'Закупка товаров и услуг', 'Составление договоров', 'Linux', 'MS Office',
    'Консультативные продажи', 'Работа с базами данных',
    'Работа с возражениями', 'Ведение отчетности', 'PHP', 'Интернет-реклама',
    'Продвижение бренда', 'Умение работать в коллективе', 'Складской Учет',
    'Проектная документация', 'Договорная работа', 'Техническое обслуживание',
    'SMM', 'Инвентаризация', 'Java', 'Мерчандайзинг', 'MySQL',
    'Управление отношениями с клиентами', 'CorelDRAW', 'Банк-клиент',
    'Закупки', '1С: Торговля и склад', 'Internet', 'Python',
    'Подготовка презентаций', 'Копирайтинг',
    'Прием и распределение телефонных звонков', 'Бюджетирование',
    '1С: Зарплата и управление персоналом', 'входящие звонки',
    'Электронная почта', 'Точность и внимательность к деталям',
    'Управление производством', 'Административная поддержка руководителя',
    'Мобильность', '1С: Склад', 'Ведение клиентской базы', 'Прием посетителей',
    'Ремонтные работы', 'Adobe Illustrator', 'Управленческие навыки',
    'Сопровождение клиентов', 'Организация встреч',
    'Подготовка коммерческих предложений', 'Маркетинговый анализ',
    'Охрана труда и техника безопасности', 'Кассовые документы',
    'Разработка проектной документации', 'Internet Marketing',
    'Контроль сроков годности', 'Управленческая отчетность',
    'Управление производственным персоналом', 'Аналитическое мышление',
    'Материальная ответственность', 'оформление документации',
    'Маркетинговые коммуникации', 'Розничная торговля', 'Общественное питание',
    'Написание текстов', 'MS SQL', 'Маркетинговые исследования',
    'Электронный документооборот', 'исходящие звонки', 'MS Word',
    'Google Analytics', 'Целеустремленность', 'Контекстная реклама',
    'Водительское  удостоверение категории BC', 'Организация деловых поездок',
    'Обслуживание покупателей', 'реализация товаров и услуг', 'ООП',
    'PostgreSQL', 'Доброжелательность', 'Первичные документы',
    'Многозадачность', 'HTML5', 'ТМЦ', 'Основные средства', 'Выкладка товаров',
    'Планирование маркетинговых кампаний', 'Офисная техника',
    'Развитие ключевых клиентов', 'C#', 'Адаптация персонала',
    'Ведение документации', 'Транспортная логистика', 'Графический дизайн',
    'Коммуникативные навыки', 'Консультант плюс', 'Наполнение контентом',
    'Монтаж оборудования', 'Финансовая отчетность', '1С: Управление Торговлей',
    'Складская логистика', 'jQuery', '1С-Битрикс', 'Инженерные системы',
    'Яндекс.Метрика', 'Мерчендайзинг', 'Финансовый анализ',
    'Работа с поставщиками', 'оформление заказов', '1С программирование',
    'исполнение поручений руководителя', 'Традиционная розница', 'SEO',
    'Складской документооборот', 'Отчетность в ФСС', 'Проведение промо акций'
]


def draw_profile(sizes, labels, Name='no_name'):

    # Говорит о навыках котрые работадатель ожидает
    # от соискателя при представлении такого реземе

    sizes, labels = np.array(sizes), list(labels)
    PALETTE = 'Accent_r'
    sns.set(palette=PALETTE)
    sns.set_style("ticks")
    sns.set_context("talk",
                    font_scale=0.5,
                    rc={
                        "lines.linewidth": 1,
                        "lines.color": '#EDEFF3'
                    })


    sizes = (sizes - np.min(sizes)) / np.max(sizes)

    colors = [
        '#F66D44', '#FEAE65', '#E6F69D', '#AADEA7', "#64C2A6", "#2D87BB",
        "#003F5C", "#58508D", "#FF6361", "#9BBFE0", "#E8A09A", "#FBE29F",
        "#C6D68F", "#7982B9", "#A5C1DC", "#E9F6FA"
    ]
    fig1, ax1 = plt.subplots()

    patches, texts = ax1.pie(sizes, colors=colors, startangle=90)
    for w in patches:
        w.set_edgecolor('#EDEFF3')


    centre_circle = plt.Circle((0, 0), 0.70, fc='#EDEFF3', edgecolor='#EDEFF3')
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)

    #print(texts)
    plt.axis(
        'equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

    fig1.legend(patches, labels, bbox_to_anchor=(0, 0.7), loc='upper left')
    # Set aspect ratio to be equal so that pie is drawn as a circle.
    plt.axis('equal')
    #plt.tight_layout()
    plt.savefig(f'/var/www/html/svg/{Name}.svg', transparent=True, bbox_inches='tight')

    #plt.show()


def get_n_most_tags(l=top200, t=None, n=8):
    t = t.flatten().tolist()
    s = [(l[i], t[i]) for i in range(len(t))]
    s = sorted(s, key=lambda x: x[1])
    return s[-n:]


def get_plot_and_tags(S2,
                      N=12,
                      prepare_text=None,
                      tokenize=None,
                      model=None,
                      L=top200):
    S2 = prepare_text(S2.replace("\n", " "))
    if S2 == "notRu":
        return False, False
    S2 = tokenize.texts_to_matrix([S2], mode="tfidf")
    tags = model.predict(S2)
    return (get_n_most_tags(l=L, t=tags, n=N), tags)
