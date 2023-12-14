import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useRouter } from 'next/router';
import {ProceduresTable} from 'src/sections/tables/procedures-table';

export const OverviewLatestProcedures = (props) => {
  const { sx } = props;
  const router = useRouter();

  const openNewProcedurePage = () => {
    router.push('/create_procedure');
  };

  return (
    <Card sx={sx}>
      <CardHeader
        title="Latest Procedures"
        action={
          <Button
            startIcon={(
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            )}
            variant="contained"
            aria-label="add procedure"
            onClick={openNewProcedurePage}
          >
            New Procedure
          </Button>
        }
      />
      <Scrollbar sx={{ flexGrow: 1 }}>
       <ProceduresTable sx={{ minWidth: '100%' }}></ProceduresTable>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProcedures.prototype = {
  sx: PropTypes.object
};
