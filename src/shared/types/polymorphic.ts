import * as React from "react";

/* ElementType으로 제한한다. ex. <a>, <button> ... */
type AsProp<T extends React.ElementType> = {
  as?: T;
};

/**
 * AsProp<T>와 Props의 중복 props(attributes)를 union으로 추출한다.
 *
 * ( AsProp: as, onClick, className, style ...
 *   Props: variant, color, size, className, style ...
 *   => className, style ... )
 */
type OverlapProps<T extends React.ElementType, Props> = keyof (AsProp<T> &
  Props);

export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = object,
> = (Props & AsProp<T>) &
  Omit<React.ComponentPropsWithoutRef<T>, OverlapProps<T, Props>>;

type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicComponentWithRef<
  T extends React.ElementType,
  Props = object,
> = PolymorphicComponentProps<T, Props> & {
  ref?: PolymorphicRef<T>;
};
