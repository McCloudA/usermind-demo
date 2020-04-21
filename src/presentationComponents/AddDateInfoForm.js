import React, { useState } from 'react';
// 3rd Party
import FontAwesome from 'react-fontawesome';
import AnimateHeight from 'react-animate-height';
// My Helpers
import { refreshObj, toTitleCase } from '../helpers';
// Styles
import './AddDateInfoForm.css';

const AddDateInfoForm = (props) => {
  const formInitialState = {
    date: '',
    bananas: '',
    strawberries: '',
    apples: '',
    oranges: ''
  };
  const formInputs = Object.keys(formInitialState);
  const dropdownAnimationTime = 500; // ms

  const [height, setHeight] = useState(0);
  const [showError, setShowError] = useState(false);
  const [form, setForm] = useState(formInitialState);

  const notAllFieldsHaveEntries = formInputs.some(inp => !(form[inp].length > 0));

  const submitForm = () => {
    const areAllFormInputsValid = !formInputs.some(input => {
      return (/date/.test(input))
      ? !/\d{2}\/\d{2}\/\d{4}/.test(form[input])
      : /\D/.test(form[input]);
    });

    if (areAllFormInputsValid) {
      const { date, bananas, strawberries, apples, oranges } = form;

      props.addToProduce({
        date,
        bananas,
        strawberries,
        apples,
        oranges
      });

      setForm(formInitialState);
      setHeight(0);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div>
      <h2 onClick={() => setHeight(height ? 0 : 'auto')} className="InfoRow-entry-title">
        <FontAwesome
          className={height ? 'fa-rotate-90' : ''}
          name='caret-right'
          size='2x'
          style={{ transition: `all ${dropdownAnimationTime}ms ease-out` }}
        />
        Add More Data?
      </h2>
      <AnimateHeight
        duration={ dropdownAnimationTime }
        height={ height } >
        <form onSubmit={e => {
          e.preventDefault();
          submitForm();
        }} className="AddDateInfoForm">
          {
            Object.keys(form)
            .map((inputTitle, i) => (
              <div className="form-group" key={`${inputTitle}-${i}`}>
                <label>
                  { toTitleCase(inputTitle) }
                </label>
                <input
                  type="text"
                  value={form[inputTitle]}
                  className="form-control"
                  onChange={e => {
                    form[inputTitle] = e.target.value;
                    setForm(refreshObj(form));
                  }}
                  placeholder={/date/.test(inputTitle) ? '01/07/2019' : `Num. of ${toTitleCase(inputTitle)}`} />
              </div>
            ))
          }
          {
            showError && (
            <div className="form-group error-msg">
              <p className="help-block">Please make sure your date is formatted like MM/DD/YYYY, and your number of bananas, strawberries, apples, &amp; oranges are numbers.</p>
            </div>
            )

          }
          <button type="submit" disabled={notAllFieldsHaveEntries} className="btn btn-primary">
            Add!
          </button>
        </form>
      </AnimateHeight>
    </div>
  );
}

export default AddDateInfoForm;
