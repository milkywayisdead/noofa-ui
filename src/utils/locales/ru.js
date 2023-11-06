const ru = {
    localeName: 'ru',
    localeChange: 'Смена языка',
    actions: {
        open: 'Открыть',
        cancel: 'Отменить',
        save: 'Сохранить',
        delete: 'Удалить',
        edit: 'Редактировать',
        itemDelete: 'Удаление элемента профиля',
        add: 'Добавить',
        gotIt: 'Понятно',
        reload: 'Перезагрузить',
        ok: 'OK',
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
        save: 'Сохранить профиль',
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
        testConnection: 'Проверить соединение',
        connectionTest: 'Проверка соединения',
    },
    queries: {
        new: 'Добавление запроса',
        name: 'Название запроса',
        from: 'Вариант конфигурации',
        expression: 'Выражение',
        constructor: 'Конструктор',
        source: 'Источник',
        plural: 'Запросы',
        run: 'Выполнить запрос',
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
        dtypesConv: 'Преобразование типов',
        dtypes: {
            none: '--',
            int: 'В целое число',
            float: 'В число с плавающей точкой',
            str: 'В строку',
            datetime: 'Во временную метку',
        },
        targetDtype: 'Вариант преобразования',
        run: 'Построить датафрейм',
    },
    tables: {
        singular: 'Таблица',
        plural: 'Таблицы',
        new: 'Добавление таблицы',
        name: 'Название',
        from: 'Вариант построения',
        dataframe: 'Датафрейм',
        expression: 'Выражение',
        exclude: 'Отбрасываемые столбцы',
        aliases: 'Переименование столбцов',
        colName: 'Название столбца',
        colAlias: 'Новое название столбца',
        title: 'Заголовок',
        run: 'Построить таблицу',
    },
    components: {
        components: 'Компоненты',
    },
    figures: {
        singular: 'График',
        plural: 'Графики',
        new: 'Добавление графика',
        name: 'Название графика',
        dataframe: 'Датафрейм',
        figureType: 'Тип графика',
        from: 'Вариант построения',
        figureTypes: {
            line: 'Линии',
            pie: 'Круговая диаграмма',
            bar: 'Столбчатая диаграмма',
        },
        fromOptions: {
            dataframe: 'Из датафрейма',
            list: 'Наборы значений',
        },
        titleText: 'Заголовок',
        showLegend: 'Показывать легенду',
        datasets: 'Наборы значений',
        datasetName: 'Название набора',
        datasetXExpression: 'Выражение для значений X',
        datasetYExpression: 'Выражение для значений Y',
        lineGroup: 'Группировать по столбцу',
        aggDf: 'Агрегировать датафрейм',
        groupby: 'Группировать по',
        aggfunc: 'Агрегатная функция',
        aggOn: 'Применить к столбцу',
        xCol: 'Столбец значений X',
        yCol: 'Столбец значений Y',
        pieNames: 'Столбец имён',
        pieValues: 'Столбец значений',
        orientation: 'Ориентация',
        orientations: {
            h: 'Горизонтальная',
            v: 'Вертикальная',
        },
        run: 'Построить график',
    },
    values: {
        singular: 'Вычисляемое значение',
        plural: 'Вычисляемые значения',
        new: 'Добавление вычисляемого значения',
        name: 'Название значения',
        expression: 'Выражение',
        result: 'Результат',
        run: 'Вычислить значение',
    },
    documents: {
        singular: 'Документ',
        plural: 'Документы',
        new: 'Добавление документа',
        name: 'Название документа',
        components: 'Компоненты',
        ctxCompontents: 'Доступные компоненты',
        downloadPdf: 'Скачать PDF',
    },
    messages: {
        itemDelete: 'Удалить элемент из профиля?',
        valueCantBeDisplayed: 'Значение успешно вычислено, но не может быть отображено.',
        localeChangeAlert: 'Для смены языка требуется перезагрузить редактор.',
        connectionTestFailed: 'Не удалось установить соединение с источником',
        connectionTestSuccess: 'Соединение с источником успешно установлено',
        unableToListProfiles: 'Не удалось получить список профилей',
        unableToGetProfile: 'Не удалось загрузить профиль',
        errorWhenDeletingProfile: 'При удалении профиля произошла ошибка',
        errorWhenCreatingProfile: 'При создании профиля произошла ошибка',
        errorWhenSavingProfile: 'При сохранении профиля произошла ошибка',
        errorWhenSavingSource: 'При сохранении источника произошла ошибка',
        errorWhenSavingQuery: 'При сохранении запроса произошла ошибка',
        errorWhenSavingDataframe: 'При сохранении датафрейма произошла ошибка',
        errorWhenSavingTable: 'При сохранении таблицы произошла ошибка',
        errorWhenSavingFigure: 'При сохранении графика произошла ошибка',
        errorWhenSavingValue: 'При сохранении значения произошла ошибка',
        errorWhenSavingDoc: 'При сохранении документа произошла ошибка',
        errorWhenSavingDashboard: 'При сохранении дашборда произошла ошибка',
        errorWhenDeletingProfileItem: 'При удалении элемента произошла ошибка',
        errorWhenGettingDbStruct: 'При получении структуры БД произошла ошибка',
        sourceSavedSuccess: 'Источник успешно сохранён',
        querySavedSuccess: 'Запрос успешно сохранён',
        dataframeSavedSuccess: 'Датафрейм успешно сохранён',
        tableSavedSuccess: 'Таблица успешно сохранена',
        figureSavedSuccess: 'График успешно сохранён',
        docSavedSuccess: 'Документ успешно сохранён',
        valueSavedSuccess: 'Значение успешно сохранено',
        dashboardSavedSuccess: 'Дашборд успешно сохранён',
        profileSavedSuccess: 'Профиль успешно сохранён',
        itemDeletedSuccess: 'Элемент успешно удалён',
        errorWhenGettingQueryData: 'Ошибка при выполнении запроса',
        errorWhenGettingDataframeData: 'Ошибка при построении датафрейма',
        errorWhenGettingTableData: 'Ошибка при построении таблицы',
        errorWhenGettingFigureData: 'Ошибка при построении графика',
        errorWhenGettingValueData: 'Ошибка при вычислении значения',
        errorWhenGettingDocData: 'Ошибка при создании документа',
        queryDataSuccess: 'Запрос успешно выполнен',
        dataframeDataSuccess: 'Датафрейм успешно построен',
        tableDataSuccess: 'Таблица успешно построена',
        figureDataSuccess: 'График успешно построен',
        valueDataSuccess: 'Значение успешно получено',
    },
    dbstruct: {
        dbstruct: 'Структура БД',
        fk: 'Внешний ключ',
    },
    aggFuncs: {
        sum: 'Сумма',
        mean: 'Среднее значение',
        min: 'Минимальное значение',
        max: 'Наибольшее значение',
        count: 'Количество',
        std: 'Стандартное отклонение',
        var: 'Дисперсия',
    },
    dashboards: {
        singular: 'Дашборд',
        plural: 'Дашборды',
        new: 'Добавление дашборда',
        name: 'Название дашборда',
        description: 'Описание',
        settings: 'Настройки дашборда',
        widgetSettings: 'Настройки виджета',
        height: 'Высота',
        width: 'Ширина',
        bindToGrid: 'Привязка к сетке',
    },
    widgets: {
        singular: 'Виджет',
        plural: 'Виджеты',
        new: 'Добавление виджета',
        types: {
            text: 'Текст',
            table: 'Таблица',
            figure: 'График',
        },
    },
    locale: 'Язык',
    export: {
        downloadCsv: 'Скачать CSV',
        downloadExcel: 'Скачать XLSX',
    },
}

export default ru;