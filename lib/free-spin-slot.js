'use babel';

import FreeSpinSlotView from './free-spin-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  freeSpinSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.freeSpinSlotView = new FreeSpinSlotView(state.freeSpinSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.freeSpinSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'free-spin-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.freeSpinSlotView.destroy();
  },

  serialize() {
    return {
      freeSpinSlotViewState: this.freeSpinSlotView.serialize()
    };
  },

  toggle() {
    console.log('FreeSpinSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
