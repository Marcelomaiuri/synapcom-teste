function produtoJson() {
    let product = '',
        sku = '',
        similars = '';
    $.ajax({
        url: `/assets/json/product.jsonc`,
        cache: false,
        async: false,
        type: 'GET',
        success: function (response) {
            product = JSON.parse(response)

        }

    })
    $.ajax({
        url: `/assets/json/sku.jsonc`,
        cache: false,
        async: false,
        type: 'GET',
        success: function (response) {
            sku = JSON.parse(response)

        }

    })
    $.ajax({
        url: `/assets/json/product-similars.jsonc`,
        cache: false,
        async: false,
        type: 'GET',
        success: function (response) {
            similars = JSON.parse(response)
        }
    })

    //nome produto
    $(".product__title").text(product[0].productName);

    //codigo produto
    $(".product__reference-code").text(product[0].productReference);

    //imagem produto
    let htmlImagens = '';
    for (let i = 0; i < product[0].items[0].images.length; i++) {
        htmlImagens += `<li class="product__images-item">
            <img class="product__images-image" src="${product[0].items[0].images[i].imageUrl}"/>
        </li>`;
    }
    $(".product__images-list").append(htmlImagens)

    //preço produto
    $(".product__price-de").text(sku.skus[0].listPriceFormated)
    $(".product__price-por").text(sku.skus[0].bestPriceFormated)

    //tamanho produto
    let htmlTamanhos = '';
    for (let y = 0; y < sku.skus.length; y++) {
        if (sku.skus[y].available == true) {
            htmlTamanhos += `<li class="product__sizes-itens">
            ${sku.skus[y].dimensions.Tamanho}
        </li>`;
        } else {
            htmlTamanhos += `<li class="product__sizes-itens disabled">
            ${sku.skus[y].dimensions.Tamanho}
        </li>`;
        }
    }
    $(".product__sizes-item").append(htmlTamanhos);

    //cores produto
    let htmlCores = '';
    for (let z = 0; z < similars[0].items[0].images.length; z++) {
        htmlCores += `<li class="product__colors-itens">
           <a href="${similars[z].link}" >
                <img class="product__colors-image" src="${similars[z].items[0].images[0].imageUrl}"/>
           </a>
        </li>`;
    }
    $(".product__colors-item").append(htmlCores);

    //descrição produto
    $(".product__description-text").text(product[0].description)

    //descrição detalhada produto
    $(".description__text").text(product[0].description)
    $(".description__gender").text(product[0].Gênero)
    $(".description__color").text(product[0].Cor)
    let htmlCaracteristica =  product[0].Características[0].replaceAll("\n","<br/> <br/>" )   
    $(".description__features").html(htmlCaracteristica)
    $(".description__composition").text(product[0].Composição)
    $(".description__measure").html(product[0]['Guia de Tamanhos'])
}

function scrollShow() {

}

function slick() {
    let shelf = '';
    $.ajax({
        url: `/assets/json/shelf-slick.jsonc`,
        cache: false,
        async: false,
        type: 'GET',
        success: function (response) {
            shelf = JSON.parse(response)
        }
    })
    let htmlShelf = "";
    for (let s = 0; s < shelf.length; s++) {
        htmlShelf += `<li>
            <div class="box-item">
                <a class="product-image" title="${shelf[s].productName}" href="${shelf[s].link}">
            
                    <img src="${shelf[s].items[0].images[0].imageUrl}"/>
                    
                    <span class="imgHover">
                        <img src="${shelf[s].items[0].images[1].imageUrl}"/>
                    </span>          
                
                    <h3 class="product-name">${shelf[s].productName}</h3>
                    
                    <div class="box-available">
                        <div class="price">
                            <div class="prices">
                                <span class="old-price"> 
                                    ${(shelf[s].items[0].sellers[0].commertialOffer.ListPrice).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </span>
                                <span class="best-price">
                                    ${(shelf[s].items[0].sellers[0].commertialOffer.Price).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </li>`;
    }
    $(".vitrine > ul").append(htmlShelf)
    $('.vitrine > ul').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
}

function showBuyButton() {
    let prevScrollTop = $(window).scrollTop()

    $(window).on('scroll', function (e) {

        let $src = $('.floating-buy'),
            currentScrollTop = $(this).scrollTop()

        if (currentScrollTop >= prevScrollTop && currentScrollTop > 44) {
            $src.css({
                'position': 'fixed'
            });
            $('.floating-buy').slideDown();
        } else {
            $src.css({
                'position': 'static',
            });
            $(".floating-buy").hide();
        }

        prevScrollTop = currentScrollTop
    });
}

function showMessageCart() {
    $(".product__buy-button").click(function () {
        Swal.fire({
            icon: 'success',
            title: 'Produto adicionado ao carrinho',
            showConfirmButton: false,
            timer: 1500
        })
    })

}

function sizeChoosed() {
    $(".product__sizes-itens:not(.disabled)").click(function () {
        $(".product__sizes-itens").removeClass("active");
        $(this).addClass("active");
    })
}

function divSlick() {
    $(".product__images").click(function () {
        $(".slick__carousel").removeClass("active")
        $(".slick__carousel").addClass("active")

    })
    $.ajax({
        url: `/assets/json/product.jsonc`,
        cache: false,
        async: false,
        type: 'GET',
        success: function (response) {
            product = JSON.parse(response)

        }

    })
    let htmlCarousel = '';
    for (let i = 0; i < product[0].items[0].images.length; i++) {
        htmlCarousel += `<li class="slick__carousel-images-item">
            <img class="slick__carousel-images-image" src="${product[0].items[0].images[i].imageUrl}"/>
        </li>`;
    }
    $(".slick__carousel-images").append(htmlCarousel)
    $(".slick__carousel-close").click(function(){
        $(".slick__carousel").removeClass("active") 
    })
    slickCarousel() 
}

function slickCarousel() {
    $(".slick__carousel-container > ul").slick({
        dots: true,
        arrows: true,
        infinite: true,
        centerMode:true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
}
function accordionMobile(){
    $(".description__title-accordion").click(function(){
        $(this).toggleClass("active")
        $(this).next().toggleClass("active")

    })
}
function slickCarouselMobile(){
    $(".product__images-list").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    })
}
$(document).ready(function () {
    produtoJson();
    scrollShow();
    slick();
    showBuyButton();
    showMessageCart();
    sizeChoosed();    
    
    if(screen.width > 1024){
        divSlick();
    }else{
        accordionMobile();
        slickCarouselMobile();
    }
})