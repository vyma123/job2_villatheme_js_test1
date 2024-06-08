const container = document.querySelector('.main > .div');
const fInput = document.getElementsByClassName('fInput');
const saveD = document.getElementById('saveD');
const deleteS = document.querySelector('.delete');

let t = 0;

function removeInput(event) {
  const button = event.target.closest('#delete');
  if (button) {
    button.closest('.div').remove();
  }
  //remove when click remove input
  localStorage.clear();
  location.reload();
}

function addInputField() {
  t += 1;

  const formHTML = `
    <div class="div fInput"  id='fInput${t}'>
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Input field</p>
                        <button id='delete'  class="delete" >
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form " name='forms'  >
                        <div class="box_input">
                            <label class="label" for="type">Type</label>
                            <select id='type'>
                                 <option value="button">button</option>
                                <option value="checkbox">checkbox</option>
                                <option value="color">color</option>
                                <option value="date">date</option>
                                <option value="datetime">datetime-local</option>
                                <option value="email">email</option>
                                <option value="file">file</option>
                                <option value="hidden">hidden</option>
                                <option value="image">image</option>
                                <option value="month">month</option>
                                <option value="number" selected>number</option>
                                <option value="password">password</option>
                                <option value="radio">radio</option>
                                <option value="range">range</option>
                                <option value="reset">reset</option>
                                <option value="search">search</option>
                                <option value="submit">submit</option>
                                <option value="tel">tel</option>
                                <option value="text">text</option>
                                <option value="time">time</option>
                                <option value="url">url</option>
                                <option value="week">week</option>
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="label">Label</label>
                            <input type="text"   id="label${t}"  name="label" required>
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="box_input">
                            <label for="id">Id</label>
                            <input type="text" id="id" name="id" required >
                        </div>
                        <div class="box_input">
                            <label for="placeholder">Placeholder</label>
                            <input type="text" id="placeholder" name="placeholder" required>
                        </div>
                        <div class="box_input end">
                            <label for="required">Required</label>
                            <input class="last_input" type="checkbox" id="required" name="required" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
  container.insertAdjacentHTML('beforeend', formHTML);

  const deleteBtns = container.querySelectorAll('#delete');
  deleteBtns[deleteBtns.length - 1].addEventListener(
    'click',
    removeInput
  );
}

function saveHTML() {
  localStorage.setItem('htmlF', container.innerHTML);
}

function hI() {
  localStorage.removeItem('formDataInput');
}

function getValues() {
  var storedValues = localStorage.getItem('htmlF');
  if (storedValues) {
    container.innerHTML = storedValues;
  }

  const storedFormData =
    JSON.parse(localStorage.getItem('formDataInput')) || [];
  for (let i = 0; i < storedFormData.length; i++) {
    const label = document.getElementById(`label${i + 1}`);
    if (label) {
      label.value = storedFormData[i].label;
    }
  }

  const deleteBtns = container.querySelectorAll('.delete');
  deleteBtns.forEach((btn) =>
    btn.addEventListener('click', removeInput)
  );
}

getValues();

saveD.addEventListener('click', myfunc);

function myfunc() {
  saveHTML();
  const arr1 = [];
  for (let i = 0; i < fInput.length; i++) {
    const label = document.getElementById(`label${i + 1}`);

    const formD = {
      label: label.value,
    };

    arr1.push(formD);

    localStorage.setItem(
      'formDataInput',
      JSON.stringify(arr1)
    );
  }
}
