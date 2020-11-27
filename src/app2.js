import './app2.css'
import $ from 'jquery'

const html = `
    <section id="app2">
        <ol class="nav">
            <li><span>1111</span></li>
            <li><span>2222</span></li>
        </ol>
        <ol class="content">
            <li>content1</li>
            <li>content2</li>
        </ol>
    </section>
`
$(html).appendTo($('body .page'))

const $navBar = $('#app2 .nav')
const $content = $('#app2 .content')

$navBar.on('click', 'li', (e) => {
    const $li = $(e.currentTarget)
    const index = $li.index()
    localStorage.setItem('app2-index', index)
    $li.addClass('selected')
        .siblings().removeClass('selected')
    $content.children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
})

$navBar.children().eq(localStorage.getItem('app2-index') || 0).trigger('click')