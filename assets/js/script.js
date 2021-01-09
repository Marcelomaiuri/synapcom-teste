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
    for (let y = 0; y < sku.dimensionsMap.Tamanho.length; y++) {
        htmlTamanhos += `<li class="product__sizes-itens">
            ${sku.dimensionsMap.Tamanho[y]}
        </li>`;
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
}
produtoJson()