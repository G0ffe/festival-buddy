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
        $('.list-festivals').html('<h2>No Festivals listed at this time.</h2>');
    }
    else {
        $('#list-festivals').empty();
        for (let i = 0; i < state.festivals.length; i++) {
            let fullDate = (new Date(state.festivals[i].date));
            date = fullDate.toString().slice(0, 16);
            time = state.festivals[i].time;
            const html = `<li class="col-lg-3 col-md-12 col-xs-12" value="${state.festivals[i].id}">${state.festivals[i].name}   <button type="button" class="name-editButton"><i class="fa fa-pencil" aria-hidden="true"></i></button> <button class="delete-button"><i class="fa fa-window-close delete" aria-hidden="true"></i></button><br>${date}    <button class="date-editButton"><i class="fa fa-pencil" aria-hidden="true"></i></button><br>${time}    <button class="time-editButton"><i class="fa fa-pencil" aria-hidden="true"></i></button><br>${state.festivals[i].location}    <button class="location-editButton"><i class="fa fa-pencil" aria-hidden="true"></i></button><br>
            </li>`;
            $('#list-festivals').append(html);
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
    $('#updateTime').val(state.time);
};

function renderEditLocation(state) {
    $('#updateLocation').val(state.location);
};

$(document).on('click', '.name-editButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Name(globalId);
    $('.list-festivals').addClass('hidden');
    $('.name-edit').removeClass('hidden');
});

$(document).on('click', '.date-editButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Date(globalId);
    $('.list-festivals').addClass('hidden');
    $('.date-edit').removeClass('hidden');
});

$(document).on('click', '.time-editButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Time(globalId);
    $('.list-festivals').addClass('hidden');
    $('.time-edit').removeClass('hidden');
});

$(document).on('click', '.location-editButton', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Location(globalId);
    $('.list-festivals').addClass('hidden');
    $('.location-edit').removeClass('hidden');
});

$(document).on('click', '.delete-button', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    $('.list-festivals').addClass('hidden');
    $('.api-delete').removeClass('hidden');
});

$('.cancel-edit-button').click(function (e) {
    e.preventDefault();
    $('.list-festivals').removeClass('hidden');
    $('.name-edit').addClass('hidden');
    $('.date-edit').addClass('hidden');
    $('.time-edit').addClass('hidden');
    $('.location-edit').addClass('hidden');
    $('.api-delete').addClass('hidden');
});

$('#add').click(function (e) {
    e.preventDefault();
    console.log($('#name').attr(required));
    sendToApi(state);
    $('#name').val("");
    $('#date').val("");
    $('#time').val("");
    $('#location').val("");
});

$('#update-name-button').click(function (e) {
    e.preventDefault();
    const name = $('#updateName').val();
    updateApiName(name);
    $('.list-festivals').removeClass('hidden');
    $('.name-edit').addClass('hidden');

});

$('#update-date-button').click(function (e) {
    e.preventDefault();
    const date = $('#updateDate').val();
    updateApiDate(date);
    $('.list-festivals').removeClass('hidden');
    $('.date-edit').addClass('hidden');
});

$('#update-time-button').click(function (e) {
    e.preventDefault();
    const time = $('#updateTime').val();
    updateApiTime(time);
    $('.list-festivals').removeClass('hidden');
    $('.time-edit').addClass('hidden');
});

$('#update-location-button').click(function (e) {
    e.preventDefault();
    const location = $('#updateLocation').val();
    updateApiLocation(location);
    $('.list-festivals').removeClass('hidden');
    $('.location-edit').addClass('hidden');
});

$('#delete-button').click(function (e) {
    e.preventDefault();
    deleteApi();
    $('.list-festivals').removeClass('hidden');
    $('.api-delete').addClass('hidden')
})

$('#apicheck').click(function (e) {
    e.preventDefault();
    getApi(state);
    $('#apicheck').addClass('active');
    $('.add-new').addClass('hidden');
    $('.api-delete').addClass('hidden');
    $('.list-festivals').removeClass('hidden');
    $('.name-edit').addClass('hidden');
    $('.date-edit').addClass('hidden');
    $('.time-edit').addClass('hidden');
    $('.location-edit').addClass('hidden');
    $('h1').addClass('active');
    $('.tag-line').addClass('active');
    $('.front-button-1').addClass('active');
    $('.front-button-2').addClass('active');
    $('.divide').addClass('active');
    $('.button-wrapper').addClass('active');
});

$('#add-newFestival').click(function () {
    $('#add-newFestival').addClass('active');
    $('.list-festivals').addClass('hidden');
    $('.api-delete').addClass('hidden');
    $('.add-new').removeClass('hidden');
    $('.name-edit').addClass('hidden');
    $('.date-edit').addClass('hidden');
    $('.time-edit').addClass('hidden');
    $('.location-edit').addClass('hidden');
    $('h1').addClass('active');
    $('.tag-line').addClass('active');
    $('.front-button-1').addClass('active');
    $('.front-button-2').addClass('active');
    $('.divide').addClass('active');
    $('.button-wrapper').addClass('active');
});