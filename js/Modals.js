class Modals {
    constructor() {
    }

    checkOutModal() {
        return `<div id="check-in-out-modal" class="modal">
        <div class="check-out-modal-content">
          <h3>Confirm Check Out</h3>
          <label for="days">Rental length in days:</label>
          <input type="text" id="days">
          <button id="cancel-checkout-btn" class="selector-btn">Cancel</button>
          <button id="confirm-checkout-btn" class="selector-btn">Confirm</button>
        </div>
      </div>`
    }
}