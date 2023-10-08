const defaultJoinType = 'inner'

const joinTypes = [
    defaultJoinType,
    'left',
    'right',
]

const filters = [
    '>',
    '>=',
    '<',
    '<=',
    '==',
    '!=',
    'contains',
    'startswith',
    'endswith',
    'in',
]

const orderingTypes = [
    'asc',
    'desc',
]

const fillnaActions = [
    'fill',
    'drop',
]

const dtypes = [
    'none',
    'int',
    'float',
    'str',
    'datetime',
]

export {
    defaultJoinType,
    joinTypes,
    filters,
    orderingTypes,
    fillnaActions,
    dtypes,
}