const state = {
    festival: []
};

let url = "http://localhost:8080/festivals";


function getApi(state) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
    })
        .done(function (data) {
            state.festival = data;
            console.log('GET response:', JSON.stringify(data, "", 2));
            renderFestivalList(data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function getApiById(state) {
    $.ajax({
        type: 'GET',
        url: url + "/" + state,
        dataType: 'json'
    })
        .done(function (data) {
            state.festival = data;
            console.log('GET response:', JSON.stringify(data, "", 2));
            renderEdit(data);        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function sendToApi(state) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ "name": $('#name').val(), "date": $('#date').val(), "location": $('#location').val() })
    })
        .done(function (data) {
            console.log('POST response:', JSON.stringify(data, "", 2));
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function updateApi(state) {
    //console.log(state);
    $.ajax({
        type: PUT,
        url: url,
        data: JSON.stringify({ "name": $('#name').val(), "date": $('#date').val(), "location": $('#location').val() })
    })
        .done(function (data) {
            console.log('POST response:', JSON.stringify(data, "", 2));
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function renderFestivalList(state) {
    if (state.festivals.length === 0) {
        $('.listFestivals').html('<h2>No Festivals listed at this time.</h2>');
    }
    else {
        $('.listFestivals').empty();
        for (let i = 0; i < state.festivals.length; i++) {
            $('.listFestivals').append(`<ul>`);
            $('.listFestivals').append(`<li value="${state.festivals[i].id}">${state.festivals[i].name}<button class="nameEdit">Edit</button></li>`);
            let fullDate = (new Date(state.festivals[i].date));
            date = fullDate.toString().slice(0, 16);
            time = fullDate.toString().slice(17);
            $('.listFestivals').append(`<li value="${state.festivals[i].id}">Date: ${date}<button class="dateEdit">Edit</button></li>`);
            $('.listFestivals').append(`<li>Time: ${time}</li>`);
            $('.listFestivals').append(`<li value="${state.festivals[i].id}">Location: ${state.festivals[i].location}<button class="locationEdit">Edit</button></li>`);        
            $('.listFestivals').append(`</ul>`);
        }
    }

}

function renderEdit(state) {
    $('#updateName').val(state.name);
    let date = state.date.toString().slice(0, 10)
    $('#updateDate').val(date);
    $('#updateLocation').val(state.location);
}

$(document).on('click', '.nameEdit', function (e) {
    e.preventDefault();
    const id = $(this).parents().attr("value");
    console.log(id);
    //getApiById(id);
});

$(document).on('click', '.dateEdit', function (e) {
    e.preventDefault();
    const id = $(this).parents().attr("value");
    console.log(id);
    //getApiById(id);
});

$(document).on('click', '.locationEdit', function (e) {
    e.preventDefault();
    const id = $(this).parents().attr("value");
    console.log(id);
    //getApiById(id);
});

$('#add').click(function (e) {
    e.preventDefault();
    sendToApi(state);
    $('#name').val("");
    $('#date').val("");
    $('#location').val("");
});

$('#update').click(function (e) {
    e.preventDefault();
    console.log(state);
    updateApi(state);
    $('#name').val("");
    $('#date').val("");
    $('#location').val("");
});

$('#apicheck').click(function (e) {
    e.preventDefault();
    getApi(state);
});