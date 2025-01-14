const Component = (props: { config: Record<string, never> }) => {
  return <div />;
};

/**
 * Why can I pass _anything_ to config?
 * Now you can't
 */
<>
  <Component config={{}} />
</>;
