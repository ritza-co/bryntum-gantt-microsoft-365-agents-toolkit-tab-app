import { BryntumGanttProps } from '@bryntum/gantt-react';

const ganttProps : BryntumGanttProps = {
    startDate  : new Date(2026, 0, 1),
    endDate    : new Date(2026, 2, 1),
    columns    : [{ type : 'name', field : 'name', width : 250 }],
    viewPreset : 'weekAndDayLetter',
    barMargin  : 10,

    project : {
        taskStore : {
            autoTree          : true,
            transformFlatData : true
        },
        // specify data source
        transport : {
            load : {
                url : 'https://localhost:8010/data'
            },
            sync : {
                url : 'https://localhost:8010/api'
            }
        },
        autoLoad           : true,
        // Automatically introduces a `startnoearlier` constraint for tasks that (a) have no predecessors, (b) do not use
        // constraints and (c) aren't `manuallyScheduled`
        autoSetConstraints : true,
        autoSync           : true,
        validateResponse   : true
    }
};

export { ganttProps };
