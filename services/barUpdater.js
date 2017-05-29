const updateBars = require('./updateBars')
const every24h = 1000 * 60 * 60 * 24

module.exports = function scheduleUpdates(interval = every24h) {
    const update = () => updateBars().then(() => console.log('Bars have been updated'))
    update()
    setInterval(update, interval)
}