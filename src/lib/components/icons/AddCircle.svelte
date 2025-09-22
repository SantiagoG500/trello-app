<script lang="ts">
  interface IconProps {
    size?: string
    color?: string
    classes?: string
  }

  const {
    size,
    color,
    classes
  }: IconProps = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size ?? "1em"}
  height={size ?? "1em"}
  viewBox="0 0 24 24"
  class={classes}
>
  <!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
  <g
    fill="none"
    stroke={color ?? "currentColor"}
    stroke-width="1.5"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      opacity=".5"
    />
    <path
      stroke-linecap="round"
      d="M15 12h-3m0 0H9m3 0V9m0 3v3"
    />
  </g>
</svg>