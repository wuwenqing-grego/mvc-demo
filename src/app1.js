import './app1.css'
import $ from 'jquery'

const html = `
    <section id="app1">
        <div class="output">
            <span>100</span>
        </div>
        <div class="actions">
            <button id="add">+1</button>
            <button id="minus">-1</button>
            <button id="multi">*2</button>
            <button id="devide">/2</button>
        </div>
    </section>
`
$(html).appendTo($('body .page'))

const $btnAdd = $('#add')
const $btnMinus = $('#minus')
const $btnMulti = $('#multi')
const $btnDevide = $('#devide')
const $num = $('.output span')

$num.text(localStorage.getItem('n') || 100)

$btnAdd.on('click', () => {
    let n = +$num.text() + 1
    $num.text(n)
    localStorage.setItem('n', n)
})
$btnMinus.on('click', () => {
    let n = +$num.text() - 1
    $num.text(n)
    localStorage.setItem('n', n)
})
$btnMulti.on('click', () => {
    let n = +$num.text() * 2
    $num.text(n)
    localStorage.setItem('n', n)
})
$btnDevide.on('click', () => {
    let n = +$num.text() / 2
    $num.text(n)
    localStorage.setItem('n', n)
})