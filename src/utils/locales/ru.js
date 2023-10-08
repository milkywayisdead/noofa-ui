const ru = {
    actions: {
        open: 'Открыть',
        cancel: 'Отменить',
        save: 'Сохранить',
        delete: 'Удалить',
        itemDelete: 'Удаление элемента профиля',
        add: 'Добавить',
    },
    profiles: {
        singular: 'Профиль',
        open: 'Открыть профиль',
        name: 'Название профиля',
        description: 'Описание',
        created: 'Дата создания',
        lastUpdate: 'Последнее обновление',
        profileTree: 'Дерево проекта',
        defaultName: 'Безымянный',
        data: 'Данные',
        components: 'Компоненты',
        settings: 'Настройки профиля',
    },
    data: {
        data: 'Данные',
    },
    sources: {
        new: 'Добавление источника',
        name: 'Название источника',
        type: 'Тип источника',
        from: 'Вариант конфигурации',
        params: 'Параметры',
        host: 'Хост',
        port: 'Порт',
        user: 'Имя пользователя',
        password: 'Пароль',
        db: 'Название БД',
        connStr: 'Строка подключения',
        plural: 'Источники',
    },
    queries: {
        new: 'Добавление запроса',
        name: 'Название запроса',
        from: 'Вариант конфигурации',
        expression: 'Выражение',
        constructor: 'Конструктор',
        source: 'Источник',
        plural: 'Запросы',
    },
    dataframes: {
        new: 'Добавление датафрейма',
        singular: 'Датафрейм',
        plural: 'Датафреймы',
        name: 'Название датафрейма',
        from: 'Вариант построения',
        fromExpression: 'Выражение',
        fromQuery: 'Результат запроса',
        expression: 'Выражение',
        source: 'Источник',
        query: 'Запрос',
        union: 'Объединение',
        unionPlural: 'Объединения',
        newUnion: 'Добавление объединения',
        join: 'Соединение',
        joinPlural: 'Соединения',
        originalDfCol: 'Столбец исходного датафрейма',
        joinableDfCol: 'Столбец присоединяемого датафрейма',
        joinType: 'Тип соединения',
        extraCols: 'Дополнительные столбцы',
        applyExpr: 'Применить выражение к строкам',
        colName: 'Название столбца',
        applyValue: 'Заполнить одним значением',
        filters: 'Фильтры',
        filtersOperators: {
            '>': '>',
            '>=': '>=',
            '<': '<',
            '<=': '<=',
            '==': 'Равно',
            '!=': 'Не равно',
            'contains': 'Содержит',
            'startswith': 'Начинается с',
            'endswith': 'Заканчивается на',
            'in': 'Входит в',
        },
        fromSettings: 'Из настроек',
        filterType: 'Фильтр',
        filterValue: 'Значение',
        convertTo: 'Преобразование',
        conversions: {
            none: 'Без преобразования',
            num: 'В числовое значение',
            bool: 'В логическое значение',
        },
        ordering: 'Упорядочивание',
        orderingType: 'Направление',
        fillna: 'Обработка пустых значений',
        fillnaAction: 'Вариант обработки',
        fillnaActions: {
            fill: 'Заполнить значением',
            drop: 'Удалить строки',
        },
        orderingTypes: {
            asc: 'По возрастанию',
            desc: 'По убыванию',
        },
        dtypeConv: 'Преобразование типов',
        dtypes: {
            none: '--',
            int: 'В целое число',
            float: 'В число с плавающей точкой',
            str: 'В строку',
            datetime: 'Во временную метку',
        },
        targetDtype: 'Вариант преобразования',
    },
    tables: {
        plural: 'Таблицы',
    },
    figures: {
        plural: 'Графики',
    },
    messages: {
        itemDelete: 'Удалить элемент из профиля?',
    },
    dbstruct: {
        fk: 'Внешний ключ',
    },
}

export default ru;