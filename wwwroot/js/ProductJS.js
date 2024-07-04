$(document).ready(function () {
    //alert('ok');

    showAllProducts();
})

function showAllProducts() {
    //debugger
    $.ajax({
        type: 'Get',
        url: '/Product/GetAllProducts',
        dataType: 'Json',
        contentType: 'application/json;charset=utf-8',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>'
                object += '<td>' + item.productId + '</td>'
                object += '<td>' + item.productName + '</td>'
                object += '<td>' + item.quantity + '</td>'
                object += '<td>' + item.price + '</td>'
                object += '<td>' + item.totalPrice + '</td>'
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.productId + ')" > Edit </a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.productId + ')" > Delete </a></td>'
                object += '</tr>'
            })
            $('#table_data').html(object)
        },
        error: function () {
            alert('Failed to fetch products');
        }
    })
}

function clearTextBox() {
    //$('#ProductId').val(''),
    $('#ProductName').val('');
    $('#Quantity').val(''),
        $('#Price').val('');
}

function HideModalPopUp() {
    $('#ProductModel').modal('hide');
}

$('#btnAddProduct').click(function () {
    $('#ProductModel').modal('show');
    clearTextBox();
    $('#productId').hide();
    $('#btnSaveProduct').css('display', 'block');
    $('#btnUpdateProduct').css('display', 'none');
    $('#ProductHeading').text('Add Product');
})

function AddProduct() {
    debugger
    var objData = {
        ProductName: $('#ProductName').val(),
        Quantity: $('#Quantity').val(),
        Price: $('#Price').val()
    }
    $.ajax({
        type: 'Post',
        url: '/Product/AddProduct/',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        success: function () {
            alert('Poduct added successfully');
            showAllProducts();
            clearTextBox();
            HideModalPopUp();
        },
        error: function () {
            alert('Failed to add product');
        }
    })
}


function Delete(productId) {
    if (confirm('Are you sure, you want to delete this product?')) {
        $.ajax({
            url: 'Product/Delete?productId=' + productId,
            success: function () {
                alert('Product deleted successfully');
                showAllProducts();
            },
            error: function () {
                alert('Failed to delete product');
            }
        })
    }
}


function Edit(productId) {
    $.ajax({
        type: 'Get',
        url: '/Product/Edit?productId=' + productId,
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            $('#ProductModel').modal('show');
            $('#ProductId').val(response.productId);
            $('#ProductName').val(response.productName);
            $('#Quantity').val(response.quantity);
            $('#Price').val(response.price);
            $('#btnSaveProduct').css('display', 'none');
            //$('#btnUpdateProduct').css('display', 'block');
            $('#btnUpdateProduct').show();
            $('#ProductHeading').text('Update Product');
        },
        error: function () {
            alert('Product not found for id: ' + productId);
        }
    })
}

function UpdateProduct() {
    var objData = {
        ProductId: $('#ProductId').val(),
        productName: $('#ProductName').val(),
        Quantity: $('#Quantity').val(),
        price: $('#Price').val()
    }

    $.ajax({
        type: 'Post',
        url: '/Product/UpdateProduct',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        success: function () {
            alert('Product updated successfully');
            showAllProducts();
            clearTextBox();
            HideModalPopUp();
        },
        error: function () {
            alet('Failed to update product');
        }
    })
}


function SearchProduct() {
    //debugger
    var searchString = $('#SearchInput').val();

    $.ajax({
        type: 'Get',
        url: 'Product/SearchProduct?productName=' + searchString,
        data: searchString,
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            var obj = '';
            $.each(result, function (index, item) {
                obj += '<tr>'
                obj += '<td>' + item.productId + '</td>'
                obj += '<td>' + item.productName + '</td>'
                obj += '<td>' + item.quantity + '</td>'
                obj += '<td>' + item.price + '</td>'
                obj += '<td>' + item.totalPrice + '</td>'
                obj += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.productId + ')" > Edit </a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.productId + ')" > Delete </a></td>'
                obj += '</tr>'
            })
            $('#table_data').html(obj)
        },
        error: function () {
            alert('Failed to search products');
        }
    })
}


































