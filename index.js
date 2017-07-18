/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const { readFileSync } = require('fs')
const { Composer } = require('micro-bot')
const app = new Composer()
const newton = require('newtonmath.js')

const stripCommand = (message) => message.substring(message.indexOf(' '))
const messageForCommand = (ctx) => stripCommand(ctx.message.text)

const log = message => console.log(message)

const reply = (object) => response => {
  object.reply(response)
  log(response)
}

const helpText = `Here is a list of commands:
/simplify - Simplifies an expression, e.g. 2^2+2(2)
/factor - Finds the factorized form of an expression
/derive - Derives an expression
/integrate - Integrates an expression
/zeroes - Finds the 0's of an expression
/cos - Cosinus (radians)
/sin - Sinus (radians)
/tan - Tangent (radians)
/arccos - Inverse cosinus (radians)
/arcsin - Inverse sinus (radians)
/arctan - Inverse tangent (radians)
/abs - Absolute value of an expression

The next three commands work a bit differently:
/tangent - Finds the equation of a tangent. Specify value first, and put a "|" after, e.g. 2|x^3
/area - Computes the area under a curve. Specify interval first, and put a "|" after, e.g. 2:4|x^3
/log - Logarithm. Specify base first, and put a "|" after, e.g. 2|8. Base defaults to 2.`

const welcomeText = `Welcome! To get started, type a command, followed by a mathematical expression.

Try /help for the list of available commands.`

app.command('/start', (ctx) => reply(ctx)(welcomeText))

app.hears('hi', ({ reply }) => reply('Hey there!'))
app.on('sticker', ({ reply }) => reply('👍'))

const hasParam = message => message.includes('|')
const addDefaultParam = param => message => (hasParam(message) ? '' : `${param}|`) + message

app.command('/simplify', (ctx) => newton.simplify(messageForCommand(ctx), reply(ctx)))
app.command('/factor', (ctx) => newton.factor(messageForCommand(ctx), reply(ctx)))
app.command('/derive', (ctx) => newton.derive(messageForCommand(ctx), reply(ctx)))
app.command('/integrate', (ctx) => newton.integrate(messageForCommand(ctx), reply(ctx)))
app.command('/zeroes', (ctx) => newton.zeroes(messageForCommand(ctx), reply(ctx)))
app.command('/tangent', (ctx) => newton.tangent(messageForCommand(ctx), reply(ctx)))
app.command('/area', (ctx) => newton.area(messageForCommand(ctx), reply(ctx)))
app.command('/cos', (ctx) => newton.cos(messageForCommand(ctx), reply(ctx)))
app.command('/sin', (ctx) => newton.sin(messageForCommand(ctx), reply(ctx)))
app.command('/tan', (ctx) => newton.tan(messageForCommand(ctx), reply(ctx)))
app.command('/arccos', (ctx) => newton.arccos(messageForCommand(ctx), reply(ctx)))
app.command('/arcsin', (ctx) => newton.arcsin(messageForCommand(ctx), reply(ctx)))
app.command('/arctan', (ctx) => newton.arctan(messageForCommand(ctx), reply(ctx)))
app.command('/abs', (ctx) => newton.abs(messageForCommand(ctx), reply(ctx)))
app.command('/log', (ctx) => newton.log(addDefaultParam(2)(messageForCommand(ctx)), reply(ctx)))

app.command('/help', (ctx) => reply(ctx)(helpText))

// Export bot handler
module.exports = app
