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

export {
    defaultJoinType,
    joinTypes,
    filters,
}