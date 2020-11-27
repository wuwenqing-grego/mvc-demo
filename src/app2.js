import './app2.css'
import $ from 'jquery'

const $navBar = $('#app2 .nav')
const $content = $('#app2 .content')

$navBar.on('click', 'li', (e) => {
    const $li = $(e.currentTarget)
    const index = $li.index()
    $li.addClass('selected')
        .siblings().removeClass('selected')
    $content.children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
})

$navBar.children().eq(0).trigger('click')