import { useRef } from 'react';
import { BryntumGantt } from '@bryntum/gantt-react';
import { ganttProps } from '../ganttConfig';

export default function Gantt({ readOnly }: { readOnly: boolean }) {

    const gantt = useRef<BryntumGantt>(null);

    return (
        <BryntumGantt
            ref={gantt}
            {...ganttProps}
            readOnly={readOnly}
        />
    );
};