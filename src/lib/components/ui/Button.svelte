<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

    type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    type ButtonSize = 'sm' | 'md' | 'lg';

    interface ButtonProps {
        variant?: ButtonVariant;
        size?: ButtonSize;
        disabled?: boolean;
        loading?: boolean;
        href?: string;
        type?: 'button' | 'submit' | 'reset';
        class?: string;
    }

    export let variant: ButtonVariant = 'primary';
    export let size: ButtonSize = 'md';
    export let disabled = false;
    export let loading = false;
    export let href: string | undefined = undefined;
    export let type: 'button' | 'submit' | 'reset' = 'button';

    let className = '';
    export { className as class };

    const dispatch = createEventDispatcher<{ click: MouseEvent }>();

    // Variant styles
    const variantClasses = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300',
        secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500 disabled:bg-secondary-50',
        outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-400',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500 disabled:text-gray-400',
        danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 disabled:bg-error-300'
    };

    // Size styles
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    $: classes = `
		inline-flex items-center justify-center gap-2 font-medium rounded-lg
		transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
		${variantClasses[variant]}
		${sizeClasses[size]}
		${disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
		${className}
	`.trim().replace(/\s+/g, ' ');

    function handleClick(event: MouseEvent) {
        if (disabled || loading) {
            event.preventDefault();
            return;
        }
        dispatch('click', event);
    }
</script>

{#if href && !disabled}
    <a
            {href}
            class={classes}
            role="button"
            tabindex="0"
            on:click={handleClick}
            on:keydown={(e) => e.key === 'Enter' && handleClick(e)}
            {...$$restProps}
    >
        {#if loading}
            <div class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
        {/if}
        <slot />
    </a>
{:else}
    <button
            {type}
            {disabled}
            class={classes}
            on:click={handleClick}
            {...$$restProps}
    >
        {#if loading}
            <div class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
        {/if}
        <slot />
    </button>
{/if}