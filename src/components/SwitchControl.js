import React, {useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    switchLabel: {
        fontSize: '12px'
    },
}));

const SwitchControl = (props) => {
    const {checked, onChange, row} = props;
    const [isChecked, setIsChecked] = useState(checked);
    const classes = useStyles();

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isChecked}
                    onChange={() => {
                        onChange(row.id, function () {
                            setIsChecked(!isChecked);
                        })
                    }}
                    name="completed"
                    color="primary"
                />
            }
            label={<Typography className={classes.switchLabel}>Completed</Typography>}
        />
    );
}

export default SwitchControl;