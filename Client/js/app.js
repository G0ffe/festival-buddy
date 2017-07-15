const state = {
    festival: []
};


let url = "https://radiant-sands-78965.herokuapp.com/festivals/";
let globalId = '';

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

function getApiById_Name(state) {
    $.ajax({
        type: 'GET',
        url: url + state,
        dataType: 'json'
    })
        .done(function (data) {
            state.festival = data;
            console.log('GET response:', JSON.stringify(data, "", 2));
            renderEditName(data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function getApiById_Date(state) {
    console.log(state);
    $.ajax({
        type: 'GET',
        url: url + state,
        dataType: 'json'
    })
        .done(function (data) {
            state.festival = data;
            console.log('GET response:', JSON.stringify(data, "", 2));
            renderEditDate(data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function getApiById_Time(state) {
    $.ajax({
        type: 'GET',
        url: url + state,
        dataType: 'json'
    })
        .done(function (data) {
            state.festival = data;
            console.log('GET response:', JSON.stringify(data, "", 2));
            renderEditTime(data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function getApiById_Location(state) {
    $.ajax({
        type: 'GET',
        url: url + state,
        dataType: 'json'
    })
        .done(function (data) {
            state.festival = data;
            console.log('GET response:', JSON.stringify(data, "", 2));
            renderEditLocation(data);
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function sendToApi(state) {
    console.log($("#time").val());
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ "name": $('#name').val(), "date": $('#date').val(), "time": $('#time').val(), "location": $('#location').val() })
    })
        .done(function (data) {
            console.log('POST response:', JSON.stringify(data, "", 2));
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function updateApiName(name) {
    $.ajax({
        type: "PUT",
        url: url + globalId,
        data: { name: name }
    })
        .done(function (data) {
            console.log('PUT response:', JSON.stringify(data, "", 2));
            getApi(state);
            $('#updateName').val("");
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function updateApiDate(date) {
    $.ajax({
        type: "PUT",
        url: url + globalId,
        data: { date: date }
    })
        .done(function (data) {
            console.log('PUT response:', JSON.stringify(data, "", 2));
            getApi(state);
            $('#updateDate').val("");
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function updateApiTime(time) {
    console.log(time);
    $.ajax({
        type: "PUT",
        url: url + globalId,
        data: { time: time }
    })
        .done(function (data) {
            console.log('PUT response:', JSON.stringify(data, "", 2));
            getApi(state);
            $('#updateDate').val("");
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function updateApiLocation(location) {
    $.ajax({
        type: "PUT",
        url: url + globalId,
        data: { location: location }
    })
        .done(function (data) {
            console.log('PUT response:', JSON.stringify(data, "", 2));
            getApi(state);
            $('#updateLocation').val("");
        })
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function deleteApi() {
    $.ajax({
        type: "DELETE",
        url: url + globalId,
    })
        .done(function (data) {
            console.log('Festival Deleted');
            getApi(state);
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
            let fullDate = (new Date(state.festivals[i].date));
            date = fullDate.toString().slice(0, 16);
            time = state.festivals[i].time;
            const html = `<ul><li value="${state.festivals[i].id}"><span class="bold">Name:</span> ${state.festivals[i].name}   <button type="button" class="nameEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></button> <button class="deleteButton"><i class="fa fa-window-close delete" aria-hidden="true"></i></button></li><li value="${state.festivals[i].id}"><span class="bold">Date:</span> ${date}    <button class="dateEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></button></li><li value="${state.festivals[i].id}"><span class="bold">Time: </span>${time}    <button class="timeEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></button></li><li value="${state.festivals[i].id}"><span class="bold">Location: </span>${state.festivals[i].location}    <button class="locationEditButton"><i class="fa fa-pencil" aria-hidden="true"></i></button></li></ul>`
            $('.listFestivals').append(html);
        }
    }

}

function renderEditName(state) {
    $('#updateName').val(state.name);
};

function renderEditDate(state) {
    let date = state.date.toString().slice(0, 10)
    $('#updateDate').val(date);
};

function renderEditTime(state) {
    let time = state.date.toString().slice(11, 23)
    $('#updateTime').val(time);
};

function renderEditLocation(state) {
    $('#updateLocation').val(state.location);
};

$(document).on('click', '.nameEditButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Name(globalId);
    $('.listFestivals').addClass('hidden');
    $('.nameEdit').removeClass('hidden');
});

$(document).on('click', '.dateEditButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Date(globalId);
    $('.listFestivals').addClass('hidden');
    $('.dateEdit').removeClass('hidden');
});

$(document).on('click', '.timeEditButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Time(globalId);
    $('.listFestivals').addClass('hidden');
    $('.timeEdit').removeClass('hidden');
});

$(document).on('click', '.locationEditButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Location(globalId);
    $('.listFestivals').addClass('hidden');
    $('.locationEdit').removeClass('hidden');
});

$(document).on('click', '.deleteButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    $('.listFestivals').addClass('hidden');
    $('.apiDelete').removeClass('hidden');
});

$('.cancelEditButton').click(function (e) {
    e.preventDefault();
    $('.listFestivals').removeClass('hidden');
    $('.nameEdit').addClass('hidden');
    $('.dateEdit').addClass('hidden');
    $('.timeEdit').addClass('hidden');
    $('.locationEdit').addClass('hidden');
    $('.apiDelete').addClass('hidden');
});

$('#add').click(function (e) {
    e.preventDefault();
    sendToApi(state);
    $('#name').val("");
    $('#date').val("");
    $('#time').val("");
    $('#location').val("");
});

$('#updateNameButton').click(function (e) {
    e.preventDefault();
    const name = $('#updateName').val();
    updateApiName(name);
    $('.listFestivals').removeClass('hidden');
    $('.nameEdit').addClass('hidden');

});

$('#updateDateButton').click(function (e) {
    e.preventDefault();
    const date = $('#updateDate').val();
    updateApiDate(date);
    $('.listFestivals').removeClass('hidden');
    $('.dateEdit').addClass('hidden');
});

$('#updateTimeButton').click(function (e) {
    e.preventDefault();
    const time = $('#updateTime').val();
    updateApiTime(time);
    $('.listFestivals').removeClass('hidden');
    $('.timeEdit').addClass('hidden');
});

$('#updateLocationButton').click(function (e) {
    e.preventDefault();
    const location = $('#updateLocation').val();
    updateApiLocation(location);
    $('.listFestivals').removeClass('hidden');
    $('.locationEdit').addClass('hidden');
});

$('#deleteButton').click(function (e) {
    e.preventDefault();
    deleteApi();
    $('.listFestivals').removeClass('hidden');
    $('.apiDelete').addClass('hidden')
})

$('#apicheck').click(function (e) {
    e.preventDefault();
    getApi(state);
    $('#apicheck').addClass('active');
    $('.addNew').addClass('hidden');
    $('.apiDelete').addClass('hidden');
    $('.listFestivals').removeClass('hidden');
    $('.nameEdit').addClass('hidden');
    $('.dateEdit').addClass('hidden');
    $('.timeEdit').addClass('hidden');
    $('.locationEdit').addClass('hidden');
    $('nav').removeClass('with-background');
    $('h1').addClass('active');
    $('.tag-line').addClass('active');
    $('.front-button-1').addClass('active');
    $('.front-button-2').addClass('active');
    $('.divide').addClass('active');
    $('.button-wrapper').addClass('active');
});

$('#addNewFestival').click(function () {
    $('#addNewFestival').addClass('active');
    $('.listFestivals').addClass('hidden');
    $('.apiDelete').addClass('hidden');
    $('.addNew').removeClass('hidden');
    $('nav').removeClass('with-background');
    $('.nameEdit').addClass('hidden');
    $('.dateEdit').addClass('hidden');
    $('.timeEdit').addClass('hidden');
    $('.locationEdit').addClass('hidden');
    $('h1').addClass('active');
    $('.tag-line').addClass('active');
    $('.front-button-1').addClass('active');
    $('.front-button-2').addClass('active');
    $('.divide').addClass('active');
    $('.button-wrapper').addClass('active');
});