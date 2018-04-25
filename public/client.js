"use strict";

// Show Admin Landing Screen
function showAdminLandingScreen() {
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').show();
    $('#add-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#edit-job-screen').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
}

// function changeDate(){
//     var currentDate= document.getElementById('date').value; 
//     //Extracting the date value in dd/mm/yyyy format from the mentioned text box
//     alert('The original value: ' + currentDate); 
//     //Printing the extracted date value before making the change
//     var newDate = currentDate.split('/'); 
//     //Splitting the extracted date value using the delimiter /, which is the seperator used in the date value         
//     currentDate = newDate[1] + "/" + newDate[0] + "/" + newDate[2];//Constructing a new date value (string) using the splitted values.
//     alert('Value after the change : ' + currentDate);//Showing the new date value.
// }




// Show Admin Job List Screen
function populateJobList(jobs) {
    //create an empty variable to store one LI for each one the results
//    let dateHeaderHtml = "";
    let htmlContent = "";

    $.each(jobs, function(i, item) {
        console.log(item.assignTo);
//        dateHeaderHtml += `<h3>Monday, March 26</h3>`;
        htmlContent += '<div class="job js-job-list">';
        htmlContent += `<h3 class="js-boat-name boat">${item.serviceDate}</h3>`;
        htmlContent += '<i class="far fa-edit edit-btn js-edit-job-link"></i>';
        htmlContent += `<h4 class="js-boat-name boat">${item.jobName}</h4>`;
        htmlContent += `<p class="js-job-address ${item.boatName}"></p>`;
        htmlContent += '<h5>Services</h5>';
        $.each(item.services, function(key, value) {
        htmlContent += `<p class="js-job-service">${value}</p>`;
        });
        htmlContent += '<h5>Workers</h5>';
 //       htmlContent += '<ul>';
        $.each(item.assignTo,function(key, value) {
        htmlContent += `<p class="js-job-worker">${value}</p>`;
        });
 //       htmlContent += '</ul>';
        htmlContent += '<h5>Notes</h5>';
        htmlContent += `<p class="js-job-notes">${item.jobNotes}</p>`;
        htmlContent += '</div>';
    });

//    $('.js-date-header').html(dateHeaderHtml);
    $('.js-job-list-wrapper').html(htmlContent);
}

function showWorkerJobListScreen() {
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').hide();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').show();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').show();
    $('#worker-profile-screen').hide();
}

function showAdminJobListScreen() {
    $.getJSON('/jobs', function(res) {
        populateJobList(res);
        console.log(res);
    });
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').show();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
}

// Populate Boat Name drop-down in Add Job Screen
function populateBoatNameDropdown(boats) {
    let htmlContent = "";

    $.each(boats, function(i, item) {
        htmlContent += `<option value="${item.id}">${item.boatName}</option>`;
    });

    $('.js-select-boat-name').html(htmlContent);
}


// Populate Assign To checkboxes in Add Job Screen
function populateAssignToList(workers) {
    //create an empty variable to store one LI for each one the results
    let htmlContent = "";

    $.each(workers, function(i, item) {
        htmlContent += `<li>
                            <input type="checkbox" id="${item.id}" value="${item.fullName}" name="assign-to" checked>
                            <label for="assign-to" class="checkbox">${item.fullName}</label>
                        </li>`;
    });

    //use the HTML output to show it in the index.html
    $(".js-assign-to-list").html(htmlContent);
}

// Populate Workers List Screen
function populateWorkerList(workers) {
    //create an empty variable to store one LI for each one the results
    let htmlContent = "";

    $.each(workers, function(i, item) {
        htmlContent += '<div class="worker">';
        htmlContent += '<ul class="js-worker-list-details">';
        htmlContent += `<li class="js-worker-name" id="${item.id}"><h4>${item.fullName}</h4></li>`;
        htmlContent += `<li class="js-worker-phone">${item.phoneNumber}</li>`;
        htmlContent += `<li class="js-worker-email">${item.email}</li>`;
        htmlContent += `<li class="js-worker-fullAddress">${item.fullAddress}</li>`;
        htmlContent += '</ul>';
        htmlContent += '</div>';
    });
    $(".js-worker-detail-wrapper").html(htmlContent);
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').show();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
}

function populateUpdatedWorkerScreen(result) {
    let updatedWorkerId = result.id;
    console.log(updatedWorkerId);
    $.getJSON('/users/' + updatedWorkerId, function(res) {
        $(".js-worker-detail").html(
            `<i class="far fa-edit edit-btn js-edit-worker-button" id="${updatedWorkerId}"></i>
            <ul>
                <li><h3 class="js-worker-name">${res.fullName}</h3></li>
                <li class="js-worker-phone">${res.phoneNumber}</li>
                <li class="js-worker-email">${res.email}</li>
                <li class="js-worker-address">${res.fullAddress}</li>
                <li class="js-worker-status"><span>Status:</span>Active</li>
            </ul>`);
    })
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').show();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
}


// ----------- DOCUMENT READY FUNCTION ---------------------

// $(document).ready(function() {
//     $('#login-screen').show();
//     $('html').removeClass('white-bg');
//     $('.js-menu-btn').hide();
//     $('.js-menu').hide();
//     $('#admin-home').hide();
//     $('#add-job-screen').hide();
//     $('#edit-job-screen').hide();
//     $('#job-list-screen-admin').hide();
//     $('#add-worker-screen').hide();
//     $('#worker-list-screen').hide();
//     $('#worker-detail-screen').hide();
//     $('#edit-worker-screen').hide();
//     $('#add-boat-details').hide();
//     $('.js-menu-btn').hide();
//     $('.js-worker-menu').hide(); 
//     $('#job-list-screen-worker').hide();
//     $('#worker-profile-screen').hide();
// });

// // for testing purposes
$(document).ready(function() {
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').show();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
    $('.js-edit-profile-section').hide();
});

// ----------- ADMIN SCREEN TRIGGERS ---------------------

// Handle log in information
$('#js-login-button').on('click', function(event) {
    event.preventDefault();
    const inputEmail = $('input[name="js-userName"]').val();
    const inputPw = $('input[name="js-userPw"]').val();
    // check for spaces, undefined
    if ((!inputEmail) || (inputEmail.length < 1) || (inputEmail.indexOf(' ') > 0)) {
        alert('Invalid Email')
    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
        alert('Invalid password')
    } else {
        const loginObject = {
            email: inputEmail,
            password: inputPw
        };
        console.log(loginObject);
        $.ajax({
                type: 'POST',
                url: '/signin',
                dataType: 'json',
                data: JSON.stringify(loginObject),
                contentType: 'application/json'
            })
            .done(function(result) {
                console.log(result.type);
                if (result.type == 'worker') {
                    showWorkerJobListScreen();
                } else {
                    showAdminLandingScreen();
                }
            })
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid username and password combination. Pleae check your username and password and try again.');
            });
    }
});

// Sign out and refresh page
$('.js-logout-link').on('click', function(event) {
    location.reload();
});


// Open admin landing screen when home is clicked on
$('.js-admin-home').on('click', function(event) {
    showAdminLandingScreen();
    console.log('home button clicked');
});

// Open nav menu from headers
$('.js-menu-btn').on('click', function(event) {
    event.stopPropagation();
    $('.js-menu').toggle();
});

$(document).on('click', function() {
    $('.js-menu').hide();
})


// go to Admin Landing Screen when cancel is clicked
$('.js-cancel-button').on('click', function(event) {
    showAdminLandingScreen();
});


// Open Add Job Screen
$('.js-add-job').on('click', function(event) {
    event.preventDefault();
    $.getJSON('/users', function(res) {
        populateAssignToList(res);
    });
    $.getJSON('/boats', function(res) {
        populateBoatNameDropdown(res);
    });
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').hide();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').show();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
});

//Add Job Data to database
$('#add-job-form').on('submit', function(event) {
    event.preventDefault();
    const jobName = $('#add-job-name option:selected').text();
    const services = [];
    $('input[name="add-service"]:checked').each(function(i, item) {
        services.push($(item).attr('value'))
    });
    const serviceDate = $('#date-select').val();
    const assignTo = [];
    $('input[name="assign-to"]:checked').each(function(i, item) {
        assignTo.push($(item).attr('value'))
    });
    const jobNotes = $('#add-notes').val();
    if (jobName == "") {
        alert('Please select boat');
    } else if (services == "") {
        alert('Please select service');
    } else if (serviceDate == "") {
        alert('Please select service date');
    } else if (assignTo == "") {
        alert('Please select workers');
    } else {
        const newJobObject = {
            jobName,
            services,
            serviceDate,
            assignTo,
            jobNotes
        };
        $.ajax({
                type: 'POST',
                url: '/jobs/create',
                dataType: 'json',
                data: JSON.stringify(newJobObject),
                contentType: 'application/json'
            })
            .done(function(result) {
                console.log(result);
                alert('You successfully added a new job');
                showAdminJobListScreen();
            })
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});

// Open job list screen from landing page or nav
$('.js-job-list-admin').on('click', function(event) {
    console.log('job-list-admin clicked');
    showAdminJobListScreen();
    console.log();
});

// Open Edit job screen from edit button and fill in relevant fields
$('.js-job-list').on('click', '.js-edit-job-link', function(event) {
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('.js-menu-btn').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').show();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').hide();
    console.log('edit job link clicked');
});

// Add worker data to database
$('#add-worker-form').on('submit', function(event) {
    event.preventDefault();
    const firstName = $('#add-first-name').val();
    const lastName = $('#add-last-name').val();
    const phoneNumber = $('#add-phone-number').val();
    const address = $('#add-address').val();
    const address2 = $('#add-address-2').val();
    const city = $('#add-city').val();
    const state = $('#add-state').val();
    const zipCode = $('#add-zip-code').val();
    const email = $('#add-email').val();
    const password = $('#add-initial-pw').val();
    const type = $('input[class="add-type"]:checked').val();
    const status = $('input[class="add-status"]:checked').val();
    if (firstName == "") {
        alert('Please input first name');
    } else if (lastName == "") {
        alert('Please input last name');
    } else if (phoneNumber == "") {
        alert('Please input phone number');
    } else if (address == "") {
        alert('Please input address');
    } else if (address2 == "") {
        alert('Please input address2');
    } else if (city == "") {
        alert('Please input city');
    } else if (state == "") {
        alert('Please input state');
    } else if (zipCode == "") {
        alert('Please input zip code');
    } else if (email == "") {
        alert('Please input email');
    } else if (password == "") {
        alert('Please input password');
    } else if (type == "") {
        alert('Please input type');
    } else if (status == "") {
        alert('Please input status');
    } else {
        const newUserObject = {
            firstName,
            lastName,
            phoneNumber,
            address,
            address2,
            city,
            state,
            zipCode,
            email,
            password,
            type,
            status
        };
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            .done(function(result) {
                console.log(result);
                alert('You successfully added a new user');
                showAdminLandingScreen();
            })
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});

// Open add worker screen from landing page or nav
$(document).on('click', '.js-add-worker', function(event) {
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('.js-menu-btn').hide();
    $('.menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').show();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').hide();
    console.log('openAddWorkerScreen ran');
});

// Open worker list screen from landing page or nav
$('.js-workers-screen').on('click', function(event) {
    event.preventDefault();
    $.getJSON('/users', function(res) {
        populateWorkerList(res);
    });
});

// Open worker detail screen from worker list screen    
$('.js-worker-detail-wrapper').on('click', 'li', function(event) {
    event.preventDefault();
    console.log('js-worker-name clicked');
    let workerId = $(this).attr('id');
    console.log(workerId);
    $.getJSON('/users/' + workerId, function(res) {
        $(".js-worker-detail").html(
            `<i class="far fa-edit edit-btn js-edit-worker-button" id="${workerId}"></i>
            <ul>
                <li><h3 class="js-worker-name">${res.fullName}</h3></li>
                <li class="js-worker-phone">${res.phoneNumber}</li>
                <li class="js-worker-email">${res.email}</li>
                <li class="js-worker-address">${res.fullAddress}</li>
                <li class="js-worker-status"><span>Status:</span>Active</li>
            </ul>`);
    });
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').show();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
});

// Open edit worker form and fill in with worker values based on Id
$('.js-worker-detail').on('click', '.js-edit-worker-button', function(event) {
    event.preventDefault();
    let workerId = $(this).attr('id');
    $.getJSON('/users/' + workerId, function(res) {
        // add in pre-filled values based on worker id
        $('#edit-first-name').val(res.firstName);
        $('#edit-last-name').val(res.lastName);
        $('#edit-phone-number').val(res.phoneNumber);
        $('#edit-address').val(res.address);
        $('#edit-address-2').val(res.address2);
        $('#edit-city').val(res.city);
        $('#edit-state').val(res.state);
        $('#edit-zip-code').val(res.zipCode);
        $('#edit-email').val(res.email);
        $('#edit-email').val(res.email);
        $('input[value="' + res.type + '"]').prop('checked', 'checked');
        $('input[value="' + res.status + '"]').prop('checked', 'checked');
        $('.edit-worker-form').attr('id', workerId);
    });
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').hide();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').show();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
});

//Send Edit Worker form to update worker information 
$('.edit-worker-form').on('submit', function(event) {
    event.preventDefault();
    let workerId = $(this).attr('id');
    console.log(workerId);
    console.log('save button clicked');
    const firstName = $('#edit-first-name').val();
    const lastName = $('#edit-last-name').val();
    const phoneNumber = $('#edit-phone-number').val();
    const address = $('#edit-address').val();
    const address2 = $('#edit-address-2').val();
    const city = $('#edit-city').val();
    const state = $('#edit-state').val();
    const zipCode = $('#edit-zip-code').val();
    const email = $('#edit-email').val();
    const password = $('#edit-initial-pw').val();
    const type = $('input[class="edit-type"]:checked').val();
    const status = $('input[class="edit-status"]:checked').val();
    if (firstName == "") {
        alert('Please input first name');
    } else if (lastName == "") {
        alert('Please input last name');
    } else if (phoneNumber == "") {
        alert('Please input phone number');
    } else if (address == "") {
        alert('Please input address');
    } else if (address2 == "") {
        alert('Please input address2');
    } else if (city == "") {
        alert('Please input city');
    } else if (state == "") {
        alert('Please input state');
    } else if (zipCode == "") {
        alert('Please input zip code');
    } else if (email == "") {
        alert('Please input email');
    } else if (type == "") {
        alert('Please input type');
    } else if (status == "") {
        alert('Please input status');
    } else {
        const updateUserObject = {
            firstName,
            lastName,
            phoneNumber,
            address,
            address2,
            city,
            state,
            zipCode,
            email,
            password,
            type,
            status
        };
        $.ajax({
                type: 'PUT',
                url: '/users/' + workerId,
                dataType: 'json',
                data: JSON.stringify(updateUserObject),
                contentType: 'application/json'
            })
            .done(function(result) {
                console.log(result);
                alert(`You successfully updated ${firstName}`);
                populateUpdatedWorkerScreen(result);
            })
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});

$('.js-edit-worker-cancel').on('click', function(event) {
    event.preventDefault();
    console.log('cancel button pushed');
    let workerId = $('.edit-worker-form').attr('id');
    console.log(workerId);
    $.getJSON('/users/' + workerId, function(res) {
        $(".js-worker-detail").html(
            `<i class="far fa-edit edit-btn js-edit-worker-button" id="${workerId}"></i>
            <ul>
                <li><h3 class="js-worker-name">${res.fullName}</h3></li>
                <li class="js-worker-phone">${res.phoneNumber}</li>
                <li class="js-worker-email">${res.email}</li>
                <li class="js-worker-address">${res.fullAddress}</li>
                <li class="js-worker-status"><span>Status:</span>Active</li>
            </ul>`);
    });
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').show();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').show();
    $('#edit-worker-screen').hide();
    $('#add-boat-details').hide();
    $('.js-worker-menu-btn').hide();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('#worker-profile-screen').hide();
});

// Open Add Boat Details form
$('.js-add-boat').click(function(event) {
    event.preventDefault();
    $('#admin-home').hide();
    $('#add-boat-details').show();
    $('#js-customer-address').hide();
});

// Open Customer Address section when checkbox unchecked
$('#customer-address-same').on('click', function() {
    $('#js-customer-address').toggle();
});

// Add boat data to database
$('#add-boat-details-form').on('submit', function(event) {
    event.preventDefault();
    console.log('Add boat form submitted');
    let boatName = $('#add-boat-name').val();
    let boatMake = $('#add-boat-make').val();
    let boatLength = $('#add-boat-length').val();
    let boatAddress = $('#add-boat-address').val();
    let boatAddress2 = $('#add-boat-address-2').val();
    let boatCity = $('#add-boat-city').val();
    let boatState = $('#add-boat-state').val();
    let boatZipCode = $('#add-boat-zip-code').val();
    let boatNotes = $('#add-boat-notes').val();
    let custFirstName = $('#add-customer-first-name').val();
    let custLastName = $('#add-customer-last-name').val();
    let custEmail = $('#add-customer-email').val();
    let custPhone = $('#add-customer-phone-number').val();
    let sameAddress = $('#customer-address-same').is(':checked');
    let custAddress = $('#add-customer-address').val();
    let custAddress2 = $('#add-customer-address-2').val();
    let custCity = $('#add-customer-city').val();
    let custState = $('#add-customer-state').val();
    let custZipCode = $('#add-customer-zip-code').val();
    if (boatName == "") {
        alert('Please input boat name');
    } else if (boatMake == "") {
        alert('Please input boat make');
    } else if (boatLength == "") {
        alert('Please input boat length');
    } else if (boatAddress == "") {
        alert('Please input boat address');
    } else if (boatCity == "") {
        alert('Please input boat city');
    } else if (boatState == "") {
        alert('Please input boat state');
    } else if (boatZipCode == "") {
        alert('Please input boat zip code');
    } else if (custFirstName == "") {
        alert('Please input customer first name');
    } else if (custLastName == "") {
        alert('Please input customer last name');
    } else if (custEmail == "") {
        alert('Please input customer email');
    } else if (custPhone == "") {
        alert('Please input customer phone number');
    } else {
        const newBoatObject = {
            boatName,
            boatMake,
            boatLength,
            boatAddress,
            boatAddress2,
            boatCity,
            boatState,
            boatZipCode,
            boatNotes,
            custFirstName,
            custLastName,
            custEmail,
            custPhone,
            custAddress,
            custAddress2,
            custCity,
            custState,
            custZipCode
        };
        $.ajax({
                type: 'POST',
                url: '/boats/create',
                dataType: 'json',
                data: JSON.stringify(newBoatObject),
                contentType: 'application/json'
            })
            .done(function(result) {
                console.log(result);
                alert('You successfully added a new boat');
                showAdminLandingScreen();
            })
            .fail(function(jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
});


// -------------- WORKER SCREEN TRIGGERS ---------------

// Open worker nav menu from headers
$('.js-worker-menu-btn').on('click', function(event) {
    event.stopPropagation();
    $('.js-worker-menu').toggle();
});

$(document).on('click', function() {
    $('.js-worker-menu').hide();
});

// Open Job List Screen from nav or header
$('.js-job-list-link').on('click', function(event) {
    event.preventDefault();
    console.log('home nav clicked');
    $.getJSON('/jobs', function(res) {
        populateJobList(res);
        showWorkerJobListScreen();
    });
});

// Open Profile screen from nav
$('.js-profile-link').on('click', function(event) {
    $('*').scrollTop(0);
    $('#login-screen').hide();
    $('html').addClass('white-bg');
    $('.js-menu-btn').hide();
    $('.js-menu').hide();
    $('#admin-home').hide();
    $('#add-job-screen').hide();
    $('#edit-job-screen').hide();
    $('#job-list-screen-admin').hide();
    $('#add-worker-screen').hide();
    $('#worker-list-screen').hide();
    $('#worker-detail-screen').hide();
    $('#edit-worker-screen').hide();
    $('.js-worker-menu-btn').show();
    $('.js-worker-menu').hide();
    $('#job-list-screen-worker').hide();
    $('.js-add-note-section').hide();
    $('#worker-profile-screen').show();
    $('#js-edit-profile-section').hide();
});

// Open Notes section in Job List when Add Notes + Hours is clicked
$('.js-add-notes-btn').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('.js-add-note-section').show();
    $('textarea').focus();
});

// Hide Notes section when cancel is clicked
$('.js-notes-cancel-button').on('click', function(event) {
    event.preventDefault();
    $('.js-add-note-section').hide();
})

// Open Edit Profile section in Profile
$('.js-edit-profile-btn').on('click', function(event) {
    $('#js-edit-profile-section').show();
    $('#js-profile').hide();
    $('#edit-profile-phone-number').focus();
});

// Hide Edit Profile section when cancel is clicked
$('.js-profile-cancel-button').on('click', function(event) {
    $('#js-edit-profile-section').hide();
    $('#js-profile').show();
});