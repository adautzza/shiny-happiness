import './App.css';
import ToDo from './components/ToDo';
// eslint-disable-next-line 
import { useTranslation, Trans } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' }
};

function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
    <div>
      {Object.keys(lngs).map((lng) => (
      <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
      {lngs[lng].nativeName}
      </button>
      ))}
      </div>
      <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>

    <div className="todo-modal">
      <h2>Here's my to-do!</h2>
      <ToDo text="Get a job!"></ToDo>
      <div className="separator"></div>
      <ToDo text="Go to interview on Wednesday!"></ToDo>
    </div>
    </>
  );
}

export default App;
