const container = document.querySelector('.main > .div');

// Load saved forms from local storage on page load
window.addEventListener('load', () => {
  const savedForms =
    JSON.parse(localStorage.getItem('forms')) || [];
  savedForms.forEach((form) => addInputField(form));
});

function containsSpecialCharacters(str) {
  const specialCharacters =
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return specialCharacters.test(str);
}

function hasMinimumLength(str) {
  return str.length >= 1;
}

function saveToLocalStorage() {
  const forms = document.querySelectorAll(
    '.main > .div > .div'
  );

  let containsInvalidLabel = false;
  let containsEmptyName = false;

  const formData = Array.from(forms).map((form) => {
    const inputs = form.querySelectorAll('input, select');
    const data = {};
    inputs.forEach((input) => {
      if (input.id === 'label') {
        // Check if label has less than 5 characters
        if (!hasMinimumLength(input.value)) {
          input.classList.add('warning');
          containsInvalidLabel = true;
        } else {
          input.classList.remove('warning');
        }
      }
      if (input.id === 'name') {
        // Check if name is empty
        if (input.value.trim() === '') {
          input.classList.add('warning');
          containsEmptyName = true;
        } else {
          input.classList.remove('warning');
        }
      }
      data[input.id] =
        input.type === 'checkbox'
          ? input.checked
          : input.value;
    });
    return data;
  });

  // If any label input is invalid, show error message and do not save
  if (containsInvalidLabel) {
    alert('label không được bỏ trống');
    return;
  }

  // If any name input is empty, show error message and do not save
  if (containsEmptyName) {
    alert('Name không được bỏ trống');
    return;
  }

  localStorage.setItem('forms', JSON.stringify(formData));
}

function addInputField(data = {}) {
  const id = Date.now(); // unique identifier for each form

  const formHTML = `
    <div class="div" data-id="${id}">
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Input field</p>
                        <button class="delete" onclick="deleteForm(${id})">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form" name='forms'>
                        <div class="box_input">
                            <label class="label" for="type">Type</label>
                            <select id='type'>
                                <option value="button" ${
                                  data.type === 'button'
                                    ? 'selected'
                                    : ''
                                }>button</option>
                                <option value="checkbox" ${
                                  data.type === 'checkbox'
                                    ? 'selected'
                                    : ''
                                }>checkbox</option>
                                <option value="color" ${
                                  data.type === 'color'
                                    ? 'selected'
                                    : ''
                                }>color</option>
                                <option value="date" ${
                                  data.type === 'date'
                                    ? 'selected'
                                    : ''
                                }>date</option>
                                <option value="datetime" ${
                                  data.type ===
                                  'datetime-local'
                                    ? 'selected'
                                    : ''
                                }>datetime-local</option>
                                <option value="email" ${
                                  data.type === 'email'
                                    ? 'selected'
                                    : ''
                                }>email</option>
                                <option value="file" ${
                                  data.type === 'file'
                                    ? 'selected'
                                    : ''
                                }>file</option>
                                <option value="hidden" ${
                                  data.type === 'hidden'
                                    ? 'selected'
                                    : ''
                                }>hidden</option>
                                <option value="image" ${
                                  data.type === 'image'
                                    ? 'selected'
                                    : ''
                                }>image</option>
                                <option value="month" ${
                                  data.type === 'month'
                                    ? 'selected'
                                    : ''
                                }>month</option>
                                <option value="number" ${
                                  data.type === 'number'
                                    ? 'selected'
                                    : ''
                                }>number</option>
                                <option value="password" ${
                                  data.type === 'password'
                                    ? 'selected'
                                    : ''
                                }>password</option>
                                <option value="radio" ${
                                  data.type === 'radio'
                                    ? 'selected'
                                    : ''
                                }>radio</option>
                                <option value="range" ${
                                  data.type === 'range'
                                    ? 'selected'
                                    : ''
                                }>range</option>
                                <option value="reset" ${
                                  data.type === 'reset'
                                    ? 'selected'
                                    : ''
                                }>reset</option>
                                <option value="search" ${
                                  data.type === 'search'
                                    ? 'selected'
                                    : ''
                                }>search</option>
                                <option value="submit" ${
                                  data.type === 'submit'
                                    ? 'selected'
                                    : ''
                                }>submit</option>
                                <option value="tel" ${
                                  data.type === 'tel'
                                    ? 'selected'
                                    : ''
                                }>tel</option>
                                <option value="text" ${
                                  data.type === 'text'
                                    ? 'selected'
                                    : ''
                                }>text</option>
                                <option value="time" ${
                                  data.type === 'time'
                                    ? 'selected'
                                    : ''
                                }>time</option>
                                <option value="url" ${
                                  data.type === 'url'
                                    ? 'selected'
                                    : ''
                                }>url</option>
                                <option value="week" ${
                                  data.type === 'week'
                                    ? 'selected'
                                    : ''
                                }>week</option>
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="label">Label</label>
                            <input placeholder='required' type="text" id="label" name="label" required value="${
                              data.label || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input type="text" placeholder='required' id="name" name="name" required value="${
                              data.name || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="id">Id</label>
                            <input type="text" id="id" name="id" required value="${
                              data.id || ''
                            }">
                        </div>
                        <div class="box_input">
                            <label for="placeholder">Placeholder</label>
                            <input type="text" id="placeholder" name="placeholder" required value="${
                              data.placeholder || ''
                            }">
                        </div>
                        <div class="box_input end">
                            <label for="required">Required</label>
                            <input class="last_input" type="checkbox" id="required" name="required" ${
                              data.required ? 'checked' : ''
                            }>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', formHTML);
}

function addTextareaField() {
  const formHTML = `
    <div class="div">
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Textarea field</p>
                        <button class="delete">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form">
                        <div class="box_input">
                            <label class="wrap2" for="type">Wrap</label>
                            <select id='wrap2'>
                                <option value="hard">hard</option>
                                <option value="soft">soft</option>
                            </select>
                        </div>
                        <div class="box_input">
                        <label for="name2">Name</label>
                        <input type="text" id="name2" name="name2" required>
                        </div>
                        <div class="box_input">
                            <label for="row2">Rows</label>
                            <input type="number" id="rows2" name="rows2" required>
                        </div>
                        <div class="box_input">
                            <label for="cols2">Columns</label>
                            <input type="number" id="cols2" name="cols2" required>
                        </div>
                         <div class="box_input end">
                            <label for="readonly2">Readonly</label>
                            <input class="last_input" type="checkbox" id="readonly2" name="readonly2" required>
                        </div>
                        <div class="box_input end">
                            <label for="required2">Required</label>
                            <input class="last_input" type="checkbox" id="required2" name="required2" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
  container.insertAdjacentHTML('beforeend', formHTML);
}

function addButtonField() {
  const formHTML = `
    <div class="div">
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Button field</p>
                        <button class="delete">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form">
                        <div class="box_input">
                            <label class="label3" for="type">Type</label>
                            <select id='type3'>
                               <option value="button">button</option>
                                <option value="reset">reset</option>
                                <option value="submit">submit</option>

                            </select>
                        </div>
                         <div class="box_input">
                            <label class="popover3" for="popover3">Popover</label>
                            <select id='popover3'>
                               <option value="hide">hide</option>
                                <option value="show">show</option>
                                <option value="toggle">toggle</option>
                            </select>
                        </div>
                        <div class="box_input">
                            <label for="name3">Name</label>
                            <input type="text" id="name3" name="name3" required>
                        </div>
                        <div class="box_input">
                            <label for="id3">Id</label>
                            <input type="number" id="id3" name="id3" required placeholder='điền 1 số'>
                        </div>
                        <div class="box_input">
                            <label for="value3">Value</label>
                            <input type="text" id="value3" name="value3" required>
                        </div>
                        <div class="box_input end">
                            <label for="disabled3">Disabled</label>
                            <input class="last_input" type="checkbox" id="disabled3" name="disabled3" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
  container.insertAdjacentHTML('beforeend', formHTML);
}

function deleteForm(id) {
  const form = document.querySelector(
    `.main > .div > .div[data-id="${id}"]`
  );
  if (form) {
    form.remove();
    saveToLocalStorage(); // Save the updated forms to local storage
  }
}

// Save data when the save button is clicked
document
  .getElementById('saveD')
  .addEventListener('click', (event) => {
    event.preventDefault();
    saveToLocalStorage();
  });
