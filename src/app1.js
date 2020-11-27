import './app1.css'
import $ from 'jquery'

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