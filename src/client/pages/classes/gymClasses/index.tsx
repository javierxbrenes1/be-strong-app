import GymClass from '../../../../common/models/GymClass';
import Class from './class';

function GymClasses(props: { classes: GymClass[] }) {
  const { classes } = props;
  return (
    <>
      {classes.map((c) => (
        <Class gymClass={c} key={c.id} />
      ))}
    </>
  );
}

export default GymClasses;
