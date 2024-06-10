const toEnum = o => Object.fromEntries(Object.entries(o).map(([k,v]) => [k, Object.fromEntries(v.map(e => [e,e]))]))
const STATUS = toEnum({
    COMMON: ['none', 'deleted', 'archived'],
    WORK: ['planned', 'assigned', 'started', 'drafted', 'reviewed', 'completed'],
    HOME: ['planned', 'started', 'completed'],
    SHOP: ['wishlisted', 'purchased', 'rejected', 'postponed', 'ordered'],
})
console.log(STATUS)

