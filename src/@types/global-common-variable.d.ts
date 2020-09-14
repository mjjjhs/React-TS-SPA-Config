import * as React from 'react';

declare module 'react' {
    interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
        jsx?: string | boolean;
        global?: string | boolean;
    }
    interface RefObject<T> {
        readonly current: T | null
    }
}