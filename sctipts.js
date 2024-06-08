const fInput = document.getElementsByClassName('fInput');
const saveD = document.getElementById('saveD');
const deleteS = document.querySelector('.delete');

let t = 0;

function removeInput(event) {
  const button = event.target.closest('button.delete');
  if (button) {
    const formDiv = button.closest('.div');
    const formId = parseInt(
      formDiv.getAttribute('data-id')
    );
    const container =
      document.querySelector('.main > .div');

    // Remove the form from the DOM
    formDiv.remove();

    // Remove the corresponding data from localStorage
    let storedFormData =
      JSON.parse(localStorage.getItem('formDataInput')) ||
      [];
    storedFormData = storedFormData.filter(
      (_, index) => index !== formId - 1
    );
    localStorage.setItem(
      'formDataInput',
      JSON.stringify(storedFormData)
    );

    // Update the IDs and data-id attributes of the remaining forms
    const remainingForms = document.querySelectorAll(
      '.div.fInput.box'
    );
    remainingForms.forEach((form, index) => {
      form.setAttribute('data-id', index + 1);
      form.id = `fInput${index + 1}`;
      const labelInput = form.querySelector(
        `#label${formId}`
      );
      if (labelInput) {
        labelInput.id = `label${index + 1}`;
      }
      const deleteButton = form.querySelector('.delete');
      deleteButton.id = `delete${index + 1}`;
    });

    // Update the global counter t
    t = remainingForms.length;
  }
}

function addInputField() {
  t += 1;
  formInputHtml(t);

  // Lấy index của form mới thêm vào
  const newIndex = t;

  // Cập nhật id và data-id của các form
  const allForms = document.querySelectorAll(
    '.div.fInput.box'
  );
  allForms.forEach((form, index) => {
    form.setAttribute('data-id', index + 1);
    form.id = `fInput${index + 1}`;
    const deleteButton = form.querySelector('.delete');
    deleteButton.id = `delete${index + 1}`;
  });

  // Thêm sự kiện click cho nút xóa của form mới
  const deleteBtn = document.getElementById(
    `delete${newIndex}`
  );
  deleteBtn.addEventListener('click', removeInput);
}

function formInputHtml(t, data = {}) {
  const formHTML = `
    <div class="div fInput box" id="fInput${t}" data-id="${t}">
        <div class="section">
            <div class="forms">
                <div class="content">
                    <div class="box_top">
                        <p class="name">Input field</p>
                        <button id="delete${t}" class="delete">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                    <form class="form" name="forms">
                        <div class="box_input">
                            <label class="label" for="type">Type</label>
                            <select id="type${t}" name="type">
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
                                  data.type === 'datetime'
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
                            <input placeholder='bắt buộc' type="text" id="label${t}" name="label" value="${
    data.label || ''
  }" required>
                        </div>
                        <div class="box_input">
                            <label for="name">Name</label>
                            <input type="text" id="name${t}" name="name" value="${
    data.name || ''
  }" required>
                        </div>
                        <div class="box_input">
                            <label for="id">Id</label>
                            <input type="text" id="id${t}" name="id" value="${
    data.id || ''
  }" required>
                        </div>
                        <div class="box_input">
                            <label for="placeholder">Placeholder</label>
                            <input type="text" id="placeholder${t}" name="placeholder" value="${
    data.placeholder || ''
  }" required>
                        </div>
                        <div class="box_input end">
                            <label for="required">Required</label>
                            <input class="last_input" type="checkbox" id="required${t}" name="required" ${
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

  const deleteBtn = document.getElementById(`delete${t}`);
  deleteBtn.addEventListener('click', removeInput);
}

window.onload = function () {
  const storedFormData =
    JSON.parse(localStorage.getItem('formDataInput')) || [];
  if (storedFormData.length > 0) {
    for (let i = 0; i < storedFormData.length; i++) {
      formInputHtml(i + 1, storedFormData[i]);
    }
  }
};

saveD.addEventListener('click', myfunc);

function myfunc() {
  const arr1 = [];
  for (let i = 0; i < fInput.length; i++) {
    const label = document.getElementById(`label${i + 1}`);
    const type = document.getElementById(`type${i + 1}`);
    const name = document.getElementById(`name${i + 1}`);
    const id = document.getElementById(`id${i + 1}`);
    const placeholder = document.getElementById(
      `placeholder${i + 1}`
    );
    const required = document.getElementById(
      `required${i + 1}`
    );

    if (label) {
      const formD = {
        label: label.value,
        type: type.value,
        name: name.value,
        id: id.value,
        placeholder: placeholder.value,
        required: required.value,
      };
      arr1.push(formD);
    }
  }
  localStorage.setItem(
    'formDataInput',
    JSON.stringify(arr1)
  );
}
