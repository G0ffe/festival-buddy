const state = {
    festival: []
};

let url = "http://localhost:8080/festivals/";
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
   $.ajax({
       type: "PUT",
       url: url + globalId,
       data: { date: time }
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

function renderFestivalList(state) {
    if (state.festivals.length === 0) {
        $('.listFestivals').html('<h2>No Festivals listed at this time.</h2>');
    }
    else {
        $('.listFestivals').empty();
        for (let i = 0; i < state.festivals.length; i++) {
            let fullDate = (new Date(state.festivals[i].date));
            date = fullDate.toString().slice(0, 16);
            time = fullDate.toString().slice(17);
            const html = `<ul><li value="${state.festivals[i].id}">Name: ${state.festivals[i].name}   <i class="fa fa-pencil nameEdit" aria-hidden="true"></i><i class="fa fa-window-close delete" aria-hidden="true"></i></li><li value="${state.festivals[i].id}">Date: ${date}   <i class="fa fa-pencil dateEdit" aria-hidden="true"></i></li><li value="${state.festivals[i].id}">Time: ${time}   <i class="fa fa-pencil timeEdit" aria-hidden="true"></i></li><li value="${state.festivals[i].id}">Location: ${state.festivals[i].location}   <i class="fa fa-pencil locationEdit" aria-hidden="true"></i></li></ul>`
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

$(document).on('click', '.nameEdit', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Name(globalId);
});

$(document).on('click', '.dateEdit', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Date(globalId);
});

$(document).on('click', '.timeEdit', function (e) {
    e.preventDefault();
    console.log("Clicked");
    globalId = $(this).parents().attr("value");
    getApiById_Time(globalId);
});

$(document).on('click', '.locationEdit', function (e) {
    e.preventDefault();
    globalId = $(this).parents().attr("value");
    getApiById_Location(globalId);
});

$('#add').click(function (e) {
    e.preventDefault();
    sendToApi(state);
    $('#name').val("");
    $('#date').val("");
    $('#location').val("");
});

$('#updateNameButton').click(function (e) {
   e.preventDefault();
   const name = $('#updateName').val();
   updateApiName(name);
});

$('#updateDateButton').click(function (e) {
   e.preventDefault();
   const date = $('#updateDate').val();
   updateApiDate(date);
});

$('#updateTimeButton').click(function (e) {
   e.preventDefault();
   const time = $('#updateTime').val();
   updateApiTime(time);
});


$('#updateLocationButton').click(function (e) {
   e.preventDefault();
   const location = $('#updateLocation').val();
   updateApiLocation(location);
});


$('#apicheck').click(function (e) {
    e.preventDefault();
    getApi(state);
});

$('#addNewFestival').click(function() {
    $('.addNew').removeClass('hidden');
})