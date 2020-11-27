import './app3.css'
import $ from 'jquery'

const $square = $('#app3 .square')
const active = localStorage.getItem('app3-active') === 'yes'
if (active) {$square.addClass('active')}

$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem('app3-active', 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem('app3-active', 'yes')
    }
})