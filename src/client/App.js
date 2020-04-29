import React, { Component } from 'react';
import './app.css';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    isShowing: false,
    nowEditing: false,
    nowSaving: false,
    currentItem: {
      id: null,
      body: null,
      status: null,
    },
  };

  openModalHandler = () => {
    this.setState({
      isShowing: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  componentDidMount() {
    fetch('/api/source')
      .then((res) => res.text())
      .then((t) => {
        this.setState({ sources: t });
      });
  }

  handleClickSaveSource() {
    this.toggleMode();
    fetch('/api/source', {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      },
      body: this.state.sources,
    });
  }

  handleClickItem(i) {
    fetch(`/api/data/${i}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState((prevState) => ({
          currentItem: {
            ...prevState.currentItem,
            ...json,
          },
        }));
      });
  }

  handleClickSaveItem() {
    this.setState({ nowSaving: true });

    fetch(`/api/data/${this.state.currentItem.id}`, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      },
    })
      .then((res) => res.text())
      .then((text) => {
        if (text === 'ok') {
          this.setState({ nowSaving: false });
          this.handleClickItem(this.state.currentItem.id);
        }
      });
  }

  handleChangeValue(e) {
    this.setState({ sources: e.target.value });
  }

  handleClickCancel() {
    this.setState({
      currentItem: {
        id: null,
        body: null,
        status: null,
      },
    });
  }

  toggleMode() {
    this.setState((prevState) => ({ nowEditing: !prevState.nowEditing }));
  }

  render() {
    const { sources } = this.state;
    let lis = '';

    if (sources) {
      lis = sources.split('\n').map((line, i) => (
        <li
          className={this.state.currentItem.id === String(i) ? 'active' : ''}
          key={i}
        >
          <a onClick={this.handleClickItem.bind(this, i)}>
            {decodeURIComponent(line)}
          </a>
        </li>
      ));
    }

    return (
      <div>
        <h3>article collector (for medium blog)</h3>
        <div className={this.state.nowEditing ? 'hidden' : ''}>
          <header>
            <button onClick={this.toggleMode.bind(this)}>편집</button>
          </header>
          <ul>{lis}</ul>
          <code
            id="content"
            className={
              this.state.currentItem.status === 'nonexist' ? 'hidden' : ''
            }
          >
            {this.state.currentItem.body}
          </code>
          <div
            id="modal"
            className={
              this.state.currentItem.status === 'nonexist' ? '' : 'hidden'
            }
          >
            <div className="modal-content">
              <p>아직 수집되지 않았습니다. 수집 후 파일로 저장하시겠습니까?</p>
              <button
                disabled={this.state.nowSaving}
                onClick={this.handleClickSaveItem.bind(this)}
              >
                수집 후 저장
              </button>
              <button
                disabled={this.state.nowSaving}
                onClick={this.handleClickCancel.bind(this)}
              >
                취소
              </button>
              <span className={this.state.nowSaving ? '' : 'hidden'}>
                저장 중...
              </span>
            </div>
          </div>
        </div>

        <div className={this.state.nowEditing ? '' : 'hidden'}>
          <header>
            <div>
              {this.state.isShowing ? (
                <div
                  onClick={this.closeModalHandler}
                  className="back-drop"
                ></div>
              ) : null}

              <button
                className="open-modal-btn"
                onClick={this.openModalHandler}
              >
                Open Modal
              </button>

              <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
                sources={sources}
                handleChangeValue={this.handleChangeValue.bind(this)}
                handleClickSaveSource={this.handleClickSaveSource.bind(this)}
              ></Modal>
            </div>
          </header>
        </div>
      </div>
    );
  }
}
