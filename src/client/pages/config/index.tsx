import SettingsIcon from '@mui/icons-material/Settings';
import PageContainer from '../../components/PageContainer';
import TimesCrud from './TimesCrud';

function ConfigPage() {
  return (
    <PageContainer Icon={SettingsIcon} text="Configuraciones">
      <TimesCrud />
    </PageContainer>
  );
}

export default ConfigPage;
